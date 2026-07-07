import { IsOptional, IsString } from 'class-validator';

export class FilterOpportunitiesDto {
  @IsOptional()
  @IsString()
  shelterId?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
