import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteersService.create(req.user.id, createVolunteerDto);
  }

  @Get('top-monthly')
  getTopMonthly() {
    return this.volunteersService.getTopMonthly();
  }

  @Get('me/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  getDashboard(@Request() req) {
    return this.volunteersService.getDashboard(req.user.id);
  }

  @Get('me/activity')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  getActivity(@Request() req) {
    return this.volunteersService.getActivity(req.user.id);
  }

  @Get('me/recommendations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  getRecommendations(@Request() req) {
    return this.volunteersService.getRecommendations(req.user.id);
  }

  @Get('me/registrations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  getRegistrations(@Request() req) {
    return this.volunteersService.getApplications(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteersService.findOne(id);
  }
}
