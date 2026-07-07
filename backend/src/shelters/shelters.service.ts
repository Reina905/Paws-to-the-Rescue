import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateShelterDto } from './dto/create-shelter.dto';

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 2) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return 'Last week';
  return 'Last month';
}

@Injectable()
export class SheltersService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(userId: string, dto: CreateShelterDto) {
    // Check if shelter already exists for this user
    const { data: existing, error: checkError } = await this.supabase
      .getClient()
      .from('shelters')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      console.error('Supabase error:', checkError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (existing) {
      throw new ConflictException('El perfil de refugio ya existe');
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('shelters')
      .insert({
        user_id: userId,
        name: dto.name,
        description: dto.description || null,
        location: dto.location,
        contact_number: dto.contactNumber || null,
        animal_capacity: dto.animalCapacity ?? 0,
        logo: dto.logo || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async findAll() {
    const { data: shelters, error } = await this.supabase
      .getClient()
      .from('shelters')
      .select('*');

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!shelters || shelters.length === 0) {
      return [];
    }

    const result = await Promise.all(
      shelters.map(async (shelter) => {
        const { count, error: countError } = await this.supabase
          .getClient()
          .from('opportunities')
          .select('*', { count: 'exact', head: true })
          .eq('shelter_id', shelter.id)
          .eq('is_active', true);

        if (countError) {
          console.error('Supabase error:', countError.message);
          throw new InternalServerErrorException('Internal server error');
        }

        return {
          id: shelter.id,
          name: shelter.name,
          logo: shelter.logo,
          description: shelter.description,
          contactNumber: shelter.contact_number,
          location: shelter.location,
          animalCapacity: shelter.animal_capacity,
          activeVolunteerOpportunities: count || 0,
        };
      }),
    );

    return result;
  }

  async findOne(id: string) {
    const { data: shelter, error } = await this.supabase
      .getClient()
      .from('shelters')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    const { data: opportunities, error: oppError } = await this.supabase
      .getClient()
      .from('opportunities')
      .select('id, name, category, location, date, duration, available_spaces, total_spaces')
      .eq('shelter_id', id)
      .eq('is_active', true);

    if (oppError) {
      console.error('Supabase error:', oppError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const mappedOpportunities = (opportunities || []).map((opp) => ({
      id: opp.id,
      name: opp.name,
      category: opp.category,
      location: opp.location,
      date: opp.date,
      duration: opp.duration,
      availableSpaces: opp.available_spaces,
      totalSpaces: opp.total_spaces,
    }));

    return {
      ...shelter,
      contactNumber: shelter.contact_number,
      animalCapacity: shelter.animal_capacity,
      opportunities: mappedOpportunities,
    };
  }

  async findByUserId(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('shelters')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data || null;
  }

  async getDashboard(userId: string) {
    // Get shelter by user_id
    const { data: shelter, error: shelterError } = await this.supabase
      .getClient()
      .from('shelters')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (shelterError) {
      console.error('Supabase error:', shelterError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    // Count active opportunities for this shelter
    const { count: activeOpportunities, error: oppError } = await this.supabase
      .getClient()
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('shelter_id', shelter.id)
      .eq('is_active', true);

    if (oppError) {
      console.error('Supabase error:', oppError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    // Get opportunity IDs for this shelter
    const { data: opportunities, error: oppIdsError } = await this.supabase
      .getClient()
      .from('opportunities')
      .select('id')
      .eq('shelter_id', shelter.id);

    if (oppIdsError) {
      console.error('Supabase error:', oppIdsError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const opportunityIds = (opportunities || []).map((o) => o.id);

    let volunteers = 0;

    if (opportunityIds.length > 0) {
      // Count distinct registered volunteers
      const { data: registrations, error: regError } = await this.supabase
        .getClient()
        .from('applications')
        .select('volunteer_id')
        .in('opportunity_id', opportunityIds);

      if (regError) {
        console.error('Supabase error:', regError.message);
        throw new InternalServerErrorException('Internal server error');
      }

      const uniqueVolunteers = new Set(
        (registrations || []).map((a) => a.volunteer_id),
      );
      volunteers = uniqueVolunteers.size;
    }

    return {
      name: shelter.name,
      location: shelter.location,
      totalAnimals: shelter.total_animals || 0,
      volunteers,
      activeOpportunities: activeOpportunities || 0,
    };
  }

  async getRecentApplications(userId: string) {
    // Get shelter by user_id
    const { data: shelter, error: shelterError } = await this.supabase
      .getClient()
      .from('shelters')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (shelterError) {
      console.error('Supabase error:', shelterError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    // Get shelter's opportunity IDs
    const { data: opportunities, error: oppError } = await this.supabase
      .getClient()
      .from('opportunities')
      .select('id')
      .eq('shelter_id', shelter.id);

    if (oppError) {
      console.error('Supabase error:', oppError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const opportunityIds = (opportunities || []).map((o) => o.id);

    if (opportunityIds.length === 0) {
      return [];
    }

    // Query recent registrations with volunteer and opportunity joins
    const { data: registrations, error: regError } = await this.supabase
      .getClient()
      .from('applications')
      .select('created_at, volunteers(name), opportunities(name)')
      .in('opportunity_id', opportunityIds)
      .order('created_at', { ascending: false })
      .limit(10);

    if (regError) {
      console.error('Supabase error:', regError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!registrations || registrations.length === 0) {
      return [];
    }

    return registrations.map((reg: any) => ({
      name: reg.volunteers?.name || 'Unknown',
      role: reg.opportunities?.name || 'Unknown',
      time: formatRelativeTime(new Date(reg.created_at)),
    }));
  }
}
