import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Use service role key to bypass RLS — backend handles its own auth via JWT guards
        const serviceRoleKey = config.get('SUPABASE_SERVICE_ROLE_KEY');
        const anonKey = config.get('SUPABASE_ANON_KEY');

        return require('@supabase/supabase-js').createClient(
          config.get('SUPABASE_URL'),
          serviceRoleKey || anonKey,
        );
      },
    },
    SupabaseService,
  ],
  exports: ['SUPABASE_CLIENT', SupabaseService],
})
export class SupabaseModule {}