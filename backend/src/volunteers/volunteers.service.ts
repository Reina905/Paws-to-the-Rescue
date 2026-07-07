import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffHours < 1) return 'Just now';
  if (diffDays < 1) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    return diffWeeks === 1 ? 'Last week' : `${diffWeeks} weeks ago`;
  }
  return diffMonths === 1 ? 'Last month' : `${diffMonths} months ago`;
}

function formatMonthYear(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

@Injectable()
export class VolunteersService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(userId: string, dto: CreateVolunteerDto) {
    // Check if volunteer profile already exists for this user
    const { data: existing, error: checkError } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      console.error('Supabase error:', checkError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (existing) {
      throw new ConflictException('El perfil de voluntario ya existe');
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('volunteers')
      .insert({
        user_id: userId,
        name: dto.name,
        role: dto.role,
        bio: dto.bio ?? null,
        avatar_url: dto.avatarUrl ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async findByUserId(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }

  async getDashboard(userId: string) {
    // Get volunteer profile
    const { data: volunteer, error: volError } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (volError) {
      console.error('Supabase error:', volError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!volunteer) {
      throw new NotFoundException();
    }

    // Query activity_logs for aggregated stats
    const { data: logs, error: logsError } = await this.supabase
      .getClient()
      .from('activity_logs')
      .select('hours, shelter_id')
      .eq('volunteer_id', volunteer.id);

    if (logsError) {
      console.error('Supabase error:', logsError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const totalHours = (logs || []).reduce((sum, log) => sum + (log.hours || 0), 0);
    const uniqueShelters = new Set((logs || []).map((log) => log.shelter_id));
    const sheltersAssisted = uniqueShelters.size;

    const since = formatMonthYear(new Date(volunteer.created_at));

    return {
      name: volunteer.name,
      role: volunteer.role,
      since,
      totalHours,
      sheltersAssisted,
    };
  }

  async getActivity(userId: string) {
    // Get volunteer profile
    const { data: volunteer, error: volError } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (volError) {
      console.error('Supabase error:', volError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!volunteer) {
      throw new NotFoundException();
    }

    // Query activity_logs with shelter join
    const { data: logs, error: logsError } = await this.supabase
      .getClient()
      .from('activity_logs')
      .select('title, hours, note, completed_at, shelters(name)')
      .eq('volunteer_id', volunteer.id)
      .order('completed_at', { ascending: false })
      .limit(10);

    if (logsError) {
      console.error('Supabase error:', logsError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!logs || logs.length === 0) {
      return [];
    }

    return logs.map((log: any) => ({
      title: log.title,
      location: log.shelters?.name || '',
      time: formatRelativeTime(new Date(log.completed_at)),
      hours: `${log.hours} hours`,
      note: log.note || '',
    }));
  }

  async getRecommendations(userId: string) {
    // Get volunteer profile
    const { data: volunteer, error: volError } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (volError) {
      console.error('Supabase error:', volError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!volunteer) {
      throw new NotFoundException();
    }

    // Get opportunity IDs the volunteer already applied for
    const { data: applications, error: appError } = await this.supabase
      .getClient()
      .from('applications')
      .select('opportunity_id')
      .eq('volunteer_id', volunteer.id);

    if (appError) {
      console.error('Supabase error:', appError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const appliedIds = (applications || []).map((a) => a.opportunity_id);

    // Query active opportunities not already applied
    let query = this.supabase
      .getClient()
      .from('opportunities')
      .select('name, location, category')
      .eq('is_active', true)
      .limit(5);

    if (appliedIds.length > 0) {
      // Exclude already-applied opportunities
      query = query.not('id', 'in', `(${appliedIds.join(',')})`);
    }

    const { data: opportunities, error: oppError } = await query;

    if (oppError) {
      console.error('Supabase error:', oppError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!opportunities || opportunities.length === 0) {
      return [];
    }

    return opportunities.map((opp: any) => ({
      title: opp.name,
      location: opp.location,
      description: opp.category
        ? `Volunteer opportunity in ${opp.category}`
        : 'Volunteer opportunity available',
      tag: opp.category || null,
    }));
  }

  async getTopMonthly() {
    // Get first and last day of current calendar month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Query activity_logs within current month
    const { data: logs, error: logsError } = await this.supabase
      .getClient()
      .from('activity_logs')
      .select('volunteer_id, hours')
      .gte('completed_at', startOfMonth.toISOString())
      .lt('completed_at', startOfNextMonth.toISOString());

    if (logsError) {
      console.error('Supabase error:', logsError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!logs || logs.length === 0) {
      return [];
    }

    // Group by volunteer_id and sum hours
    const hoursMap = new Map<string, number>();
    for (const log of logs) {
      const current = hoursMap.get(log.volunteer_id) || 0;
      hoursMap.set(log.volunteer_id, current + (log.hours || 0));
    }

    // Sort by hours descending and take top 3
    const sorted = Array.from(hoursMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (sorted.length === 0) {
      return [];
    }

    // Get volunteer names
    const volunteerIds = sorted.map(([id]) => id);
    const { data: volunteers, error: volError } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('id, name')
      .in('id', volunteerIds);

    if (volError) {
      console.error('Supabase error:', volError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const nameMap = new Map<string, string>();
    for (const v of volunteers || []) {
      nameMap.set(v.id, v.name);
    }

    const labels = ['Top Volunteer', 'Rising Star', 'Dedicated Helper'];

    return sorted.map(([volunteerId, hours], index) => ({
      place: index + 1,
      name: nameMap.get(volunteerId) || 'Unknown',
      hours,
      label: labels[index],
    }));
  }

  async getApplications(userId: string) {
    // Get volunteer by user_id
    const { data: volunteer, error: volError } = await this.supabase
      .getClient()
      .from('volunteers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (volError) {
      console.error('Supabase error:', volError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!volunteer) {
      throw new NotFoundException();
    }

    // Query registrations with joins to opportunities and shelters
    const { data: registrations, error: regError } = await this.supabase
      .getClient()
      .from('applications')
      .select(
        'id, hours, created_at, opportunities(name, date, shelters(name, location))',
      )
      .eq('volunteer_id', volunteer.id)
      .order('created_at', { ascending: false });

    if (regError) {
      console.error('Supabase error:', regError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!registrations || registrations.length === 0) {
      return [];
    }

    return registrations.map((reg: any) => ({
      id: reg.id,
      title: reg.opportunities?.name || '',
      shelter: reg.opportunities?.shelters?.name || '',
      location: reg.opportunities?.shelters?.location || '',
      date: reg.opportunities?.date || '',
      hours: reg.hours || 0,
      registeredAt: reg.created_at,
    }));
  }
}
