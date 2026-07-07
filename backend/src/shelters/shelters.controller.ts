import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createShelterDto: CreateShelterDto) {
    return this.sheltersService.create(req.user.id, createShelterDto);
  }

  @Get()
  findAll() {
    return this.sheltersService.findAll();
  }

  @Get('me/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  getDashboard(@Request() req) {
    return this.sheltersService.getDashboard(req.user.id);
  }

  @Get('me/applications/recent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  getRecentApplications(@Request() req) {
    return this.sheltersService.getRecentApplications(req.user.id);
  }

  @Get('me/opportunities')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  getMyOpportunities(@Request() req) {
    return this.sheltersService.getMyOpportunities(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheltersService.findOne(id);
  }
}
