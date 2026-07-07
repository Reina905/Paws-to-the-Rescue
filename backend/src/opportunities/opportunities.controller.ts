import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  // Public: list active opportunities with optional filters
  @Get()
  findAll(@Query() filters: FilterOpportunitiesDto) {
    return this.opportunitiesService.findAll(filters);
  }

  // Public: get opportunity detail by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(id);
  }

  // Protected: create opportunity (shelter role)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunitiesService.create(req.user.id, createOpportunityDto);
  }

  // Protected: update opportunity (shelter role)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    return this.opportunitiesService.update(id, req.user.id, updateOpportunityDto);
  }

  // Protected: delete opportunity (shelter role)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  @HttpCode(HttpStatus.OK)
  remove(@Req() req: any, @Param('id') id: string) {
    console.log('DELETE /opportunities/' + id + ' called by user ' + req.user.id);
    return this.opportunitiesService.softDelete(id, req.user.id);
  }

  // Protected: apply to opportunity (volunteer role)
  @Post(':id/apply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  @HttpCode(HttpStatus.CREATED)
  apply(@Req() req: any, @Param('id') id: string) {
    return this.opportunitiesService.apply(id, req.user.id);
  }

  // Protected: withdraw from opportunity (volunteer role)
  @Delete(':id/apply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('volunteer')
  withdraw(@Req() req: any, @Param('id') id: string) {
    return this.opportunitiesService.withdraw(id, req.user.id);
  }

  // Protected: get enrolled volunteers for an opportunity (shelter role)
  @Get(':id/applicants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('shelter')
  getApplicants(@Req() req: any, @Param('id') id: string) {
    return this.opportunitiesService.getApplicants(id, req.user.id);
  }
}
