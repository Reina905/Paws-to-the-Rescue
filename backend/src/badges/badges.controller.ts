import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  /**
   * Get all available badges in the system.
   */
  @Get()
  findAll() {
    return this.badgesService.findAll();
  }

  /**
   * Get the current volunteer's earned badges.
   */
  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  getMyBadges(@Request() req) {
    return this.badgesService.getEarnedBadgesByUserId(req.user.id);
  }
}
