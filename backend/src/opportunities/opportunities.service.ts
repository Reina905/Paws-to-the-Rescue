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
    if (String(opportunity.shelter_id) !== String(shelter.id)) {
      throw new ForbiddenException();
    }

    // Build update object mapping camelCase to snake_case
    const updateData: Record<string, any> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.location !== undefined) updateData.location = dto.location;
    if (dto.date !== undefined) updateData.date = dto.date;
    if (dto.duration !== undefined) updateData.duration = dto.duration;
    if (dto.totalSpaces !== undefined) {
      updateData.total_spaces = dto.totalSpaces;
      updateData.available_spaces = dto.totalSpaces;
    }
    if (dto.image !== undefined) updateData.image = dto.image;
    if (dto.isActive !== undefined) updateData.is_active = dto.isActive;

    const { data, error } = await this.supabase
      .getClient()
      .from('opportunities')
      .update(updateData)
      .eq('id', Number(id))
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error.message, error.code, error.details);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async softDelete(id: string, userId: string) {
    console.log('softDelete called with id:', id, 'userId:', userId);
    
    // Find shelter by user_id
    const shelter = await this.findShelterByUserId(userId);
    console.log('Found shelter:', shelter.id);

    // Verify opportunity exists
    const opportunity = await this.findOpportunityById(id);
    console.log('Found opportunity:', opportunity.id, 'shelter_id:', opportunity.shelter_id);

    // Verify ownership
    if (String(opportunity.shelter_id) !== String(shelter.id)) {
      console.log('Ownership mismatch:', opportunity.shelter_id, '!==', shelter.id);
      throw new ForbiddenException();
    }

    // Hard delete the opportunity
    console.log('Attempting delete for opportunity id:', Number(id));
    const { error, count } = await this.supabase
      .getClient()
      .from('opportunities')
      .delete()
      .eq('id', Number(id));

    console.log('Delete result - error:', error, 'count:', count);

    if (error) {
      console.error('Supabase delete error:', JSON.stringify(error));
      throw new InternalServerErrorException('Internal server error');
    }

    return { id: Number(id), deleted: true };
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

  async withdraw(opportunityId: string, userId: string) {
    // Find volunteer by user_id
    const volunteer = await this.findVolunteerByUserId(userId);

    // Check if volunteer has a registration for this opportunity
    const { data: existingApp, error: checkError } = await this.supabase
      .getClient()
      .from('applications')
      .select('id')
      .eq('volunteer_id', volunteer.id)
      .eq('opportunity_id', Number(opportunityId))
      .maybeSingle();

    if (checkError) {
      console.error('Supabase error:', checkError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!existingApp) {
      throw new NotFoundException('Registration not found');
    }

    // Delete the registration
    const { error: deleteError } = await this.supabase
      .getClient()
      .from('applications')
      .delete()
      .eq('id', existingApp.id);

    if (deleteError) {
      console.error('Supabase error:', deleteError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    // Increment available spaces
    const opportunity = await this.findOpportunityById(opportunityId);
    const { error: updateError } = await this.supabase
      .getClient()
      .from('opportunities')
      .update({ available_spaces: opportunity.available_spaces + 1 })
      .eq('id', Number(opportunityId));

    if (updateError) {
      console.error('Supabase error:', updateError.message);
      // Non-critical — registration was already removed
    }

    return { withdrawn: true };
  }

  async getApplicants(opportunityId: string, userId: string) {
    // Verify the shelter owns this opportunity
    const shelter = await this.findShelterByUserId(userId);
    const opportunity = await this.findOpportunityById(opportunityId);

    if (String(opportunity.shelter_id) !== String(shelter.id)) {
      throw new ForbiddenException();
    }

    // Get all registered volunteers for this opportunity
    const { data: applications, error } = await this.supabase
      .getClient()
      .from('applications')
      .select('id, created_at, volunteers(id, name, avatar_url)')
      .eq('opportunity_id', opportunityId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return (applications || []).map((app: any) => ({
      id: app.id,
      name: app.volunteers?.name || 'Unknown',
      avatarUrl: app.volunteers?.avatar_url || null,
      registeredAt: app.created_at,
    }));
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
      .eq('id', Number(id))
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException('Opportunity not found');
      }
      console.error('Supabase findOpportunityById error:', error.message, error.code);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!data) {
      throw new NotFoundException('Opportunity not found');
    }

    return data;
  }
}
