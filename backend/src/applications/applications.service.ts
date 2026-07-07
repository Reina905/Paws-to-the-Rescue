import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly supabase: SupabaseService) {}

  async updateStatus(
    applicationId: string,
    userId: string,
    newStatus: string,
  ) {
    const client = this.supabase.getClient();

    // 1. Find shelter by user_id
    const { data: shelter, error: shelterError } = await client
      .from('shelters')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (shelterError || !shelter) {
      throw new NotFoundException('Shelter not found');
    }

    // 2. Find the application by id
    const { data: application, error: appError } = await client
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (appError || !application) {
      throw new NotFoundException('Application not found');
    }

    // 3. Get the opportunity for this application
    const { data: opportunity, error: oppError } = await client
      .from('opportunities')
      .select('*')
      .eq('id', application.opportunity_id)
      .single();

    if (oppError || !opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    // 4. Verify the opportunity belongs to the shelter
    if (opportunity.shelter_id !== shelter.id) {
      throw new ForbiddenException();
    }

    // 5. Determine space adjustments
    const oldStatus = application.status;
    let availableSpaces = opportunity.available_spaces;

    if (newStatus === 'approved' && oldStatus !== 'approved') {
      if (availableSpaces <= 0) {
        throw new ConflictException('No hay espacios disponibles');
      }
      availableSpaces -= 1;
    } else if (newStatus === 'rejected' && oldStatus === 'approved') {
      availableSpaces += 1;
    }

    // 6. Update application status
    const { data: updatedApplication, error: updateAppError } = await client
      .from('applications')
      .update({ status: newStatus })
      .eq('id', applicationId)
      .select('*')
      .single();

    if (updateAppError) {
      console.error('Supabase error:', updateAppError.message);
      throw new InternalServerErrorException('Internal server error');
    }

    // 7. Update available_spaces if changed
    if (availableSpaces !== opportunity.available_spaces) {
      const { error: updateOppError } = await client
        .from('opportunities')
        .update({ available_spaces: availableSpaces })
        .eq('id', opportunity.id);

      if (updateOppError) {
        console.error('Supabase error:', updateOppError.message);
        throw new InternalServerErrorException('Internal server error');
      }
    }

    return updatedApplication;
  }
}
