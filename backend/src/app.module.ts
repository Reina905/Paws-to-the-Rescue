import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { SheltersModule } from './shelters/shelters.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { BadgesModule } from './badges/badges.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
    SheltersModule,
    VolunteersModule,
    OpportunitiesModule,
    BadgesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
