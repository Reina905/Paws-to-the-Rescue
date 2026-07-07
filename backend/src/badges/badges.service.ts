import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

interface BadgeRule {
  badgeName: string;
  check: (context: BadgeContext) => boolean;
}

interface BadgeContext {
  totalActivities: number;
  cleaningActivities: number;
  socializationActivities: number;
  socializationHours: number;
}

@Injectable()
export class BadgesService {
  private readonly rules: BadgeRule[] = [
    {
      badgeName: 'First Purr',
      check: (ctx) => ctx.totalActivities >= 1,
    },
    {
      badgeName: 'Kitten Caregiver',
      check: (ctx) => ctx.socializationActivities >= 1,
    },
    {
      badgeName: 'Clean Paws',
      check: (ctx) => ctx.cleaningActivities >= 10,
    },
    {
      badgeName: 'Cat Whisperer',
      check: (ctx) => ctx.socializationHours >= 20,
    },
    {
      badgeName: 'Shelter Hero',
      check: (ctx) => ctx.totalActivities >= 50,
    },
  ];

  constructor(private readonly supabase: SupabaseService) {}

  /**
   * Check all badge rules for a volunteer and award any they've earned but don't yet have.
   */
  async checkAndAwardBadges(volunteerId: number | string): Promise<void> {
    const client = this.supabase.getClient();

    // 1. Get activity logs for this volunteer
    const { data: logs, error: logsError } = await client
      .from('activity_logs')
      .select('title, shelter_id, hours')
      .eq('volunteer_id', volunteerId);

    if (logsError) {
      console.error('Badge check - logs error:', logsError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    // 2. Build context from activity logs
    const totalActivities = (logs || []).length;

    // Categorize activities by matching opportunity categories via title
    // We also check directly from the title keywords
    const cleaningActivities = (logs || []).filter((log) =>
      /clean|litter/i.test(log.title || ''),
    ).length;

    const socializationLogs = (logs || []).filter((log) =>
      /social|kitten|caregiv/i.test(log.title || ''),
    );

    const socializationActivities = socializationLogs.length;

    const socializationHours = socializationLogs.reduce(
      (sum, log) => sum + (Number(log.hours) || 0),
      0,
    );

    const context: BadgeContext = {
      totalActivities,
      cleaningActivities,
      socializationActivities,
      socializationHours,
    };

    // 3. Get all available badges
    const { data: allBadges, error: badgesError } = await client
      .from('badges')
      .select('id, name');

    if (badgesError) {
      console.error('Badge check - badges error:', badgesError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    // 4. Get badges already earned by this volunteer
    const { data: earnedBadges, error: earnedError } = await client
      .from('earned_badges')
      .select('badge_id')
      .eq('volunteer_id', volunteerId);

    if (earnedError) {
      console.error('Badge check - earned error:', earnedError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    const earnedBadgeIds = new Set(
      (earnedBadges || []).map((eb) => eb.badge_id),
    );

    // 5. Evaluate each rule and award new badges
    for (const rule of this.rules) {
      const badge = (allBadges || []).find((b) => b.name === rule.badgeName);
      if (!badge) continue; // Badge not in DB yet
      if (earnedBadgeIds.has(badge.id)) continue; // Already earned

      if (rule.check(context)) {
        const { error: insertError } = await client
          .from('earned_badges')
          .insert({ volunteer_id: volunteerId, badge_id: badge.id });

        if (insertError && !insertError.message?.includes('duplicate')) {
          console.error(
            `Badge award error (${rule.badgeName}):`,
            insertError.message,
          );
        }
      }
    }
  }

  /**
   * Get all badges earned by a volunteer (by volunteer table ID).
   */
  async getEarnedBadges(volunteerId: number | string) {
    const client = this.supabase.getClient();

    const { data, error } = await client
      .from('earned_badges')
      .select('badges(id, name, description, url_image)')
      .eq('volunteer_id', volunteerId);

    if (error) {
      console.error('Get earned badges error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return (data || []).map((row: any) => row.badges);
  }

  /**
   * Get all badges earned by a volunteer using their auth user_id.
   */
  async getEarnedBadgesByUserId(userId: string) {
    const client = this.supabase.getClient();

    // Get volunteer ID from user_id
    const { data: volunteer, error: volError } = await client
      .from('volunteers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (volError) {
      console.error('Get volunteer error:', volError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    if (!volunteer) {
      return [];
    }

    return this.getEarnedBadges(volunteer.id);
  }

  /**
   * Get all available badges in the system.
   */
  async findAll() {
    const client = this.supabase.getClient();

    const { data, error } = await client
      .from('badges')
      .select('id, name, description, url_image');

    if (error) {
      console.error('Find all badges error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }

    return data;
  }
}
