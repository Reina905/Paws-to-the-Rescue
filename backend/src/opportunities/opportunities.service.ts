import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';

@Injectable()
export class OpportunitiesService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(filters: FilterOpportunitiesDto) {
    let query = this.supabase
      .getClient()
      .from('opportunities')
      .select('*, shelters(name, logo)')
      .eq('is_active', true);

    if (filters.shelterId) {
      query = query.eq('shelter_id', filters.shelterId);
    }

    if (filters.category) {
      query = query.ilike('category', filters.category);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      image: row.image,
      category: row.category,
      shelterName: row.shelters
        ? { name: row.shelters.name, logo: row.shelters.logo }
        : null,
      name: row.name,
      location: row.location,
      date: row.date,
      duration: row.duration,
      availableSpaces: row.available_spaces,
      totalSpaces: row.total_spaces,
    }));
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('opportunities')
      .select('*, shelters(name, logo)')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException('Opportunity not found');
      }
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!data) {
      throw new NotFoundException('Opportunity not found');
    }

    return {
      id: data.id,
      image: data.image,
      category: data.category,
      shelterName: data.shelters
        ? { name: data.shelters.name, logo: data.shelters.logo }
        : null,
      name: data.name,
      location: data.location,
      date: data.date,
      duration: data.duration,
      availableSpaces: data.available_spaces,
      totalSpaces: data.total_spaces,
      shelterId: data.shelter_id,
      isActive: data.is_active,
      createdAt: data.created_at,
    };
  }

  async create(userId: string, dto: CreateOpportunityDto) {
    // Find shelter by user_id
    const shelter = await this.findShelterByUserId(userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('opportunities')
      .insert({
        shelter_id: shelter.id,
        name: dto.name,
        category: dto.category,
        location: dto.location,
        date: dto.date,
        duration: dto.duration,
        total_spaces: dto.totalSpaces,
        available_spaces: dto.totalSpaces,
        is_active: true,
        image: dto.image ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async update(id: string, userId: string, dto: UpdateOpportunityDto) {
    // Find shelter by user_id
    const shelter = await this.findShelterByUserId(userId);

    // Verify ownership
    const opportunity = await this.findOpportunityById(id);
    if (opportunity.shelter_id !== shelter.id) {
      throw new ForbiddenException();
    }

    // Build update object mapping camelCase to snake_case
    const updateData: Record<string, any> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.location !== undefined) updateData.location = dto.location;
    if (dto.date !== undefined) updateData.date = dto.date;
    if (dto.duration !== undefined) updateData.duration = dto.duration;
    if (dto.totalSpaces !== undefined) updateData.total_spaces = dto.totalSpaces;
    if (dto.image !== undefined) updateData.image = dto.image;

    const { data, error } = await this.supabase
      .getClient()
      .from('opportunities')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async softDelete(id: string, userId: string) {
    // Find shelter by user_id
    const shelter = await this.findShelterByUserId(userId);

    // Verify opportunity exists
    const opportunity = await this.findOpportunityById(id);

    // Verify ownership
    if (opportunity.shelter_id !== shelter.id) {
      throw new ForbiddenException();
    }

    // Soft delete: set is_active = false
    const { data, error } = await this.supabase
      .getClient()
      .from('opportunities')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async apply(opportunityId: string, userId: string) {
    // Find volunteer by user_id
    const volunteer = await this.findVolunteerByUserId(userId);

    // Check opportunity exists and has available spaces
    const opportunity = await this.findOpportunityById(opportunityId);

    if (opportunity.available_spaces <= 0) {
      throw new ConflictException('No available spaces for this opportunity');
    }

    // Check if volunteer is already registered
    const { data: existingApp, error: checkError } = await this.supabase
      .getClient()
      .from('applications')
      .select('id')
      .eq('volunteer_id', volunteer.id)
      .eq('opportunity_id', opportunityId);

    if (checkError) {
      console.error('Supabase error:', checkError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (existingApp && existingApp.length > 0) {
      throw new ConflictException(
        'You are already registered for this opportunity',
      );
    }

    // Insert registration (direct, no approval needed)
    const { data, error } = await this.supabase
      .getClient()
      .from('applications')
      .insert({
        volunteer_id: volunteer.id,
        opportunity_id: opportunityId,
        status: 'approved',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    // Decrement available spaces immediately
    const { error: updateError } = await this.supabase
      .getClient()
      .from('opportunities')
      .update({ available_spaces: opportunity.available_spaces - 1 })
      .eq('id', opportunityId);

    if (updateError) {
      console.error('Supabase error:', updateError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return {
      id: data.id,
      opportunityId: data.opportunity_id,
      volunteerId: data.volunteer_id,
      status: 'registered',
    };
  }

  // --- Private helper methods ---

  private async findShelterByUserId(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('shelters')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException('Shelter not found');
      }
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  private async findVolunteerByUserId(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException('Volunteer not found');
      }
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  private async findOpportunityById(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException('Opportunity not found');
      }
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!data) {
      throw new NotFoundException('Opportunity not found');
    }

    return data;
  }
}
