import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateOpportunityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsInt()
  @Min(1)
  totalSpaces: number;

  @IsOptional()
  @IsString()
  image?: string;
}
