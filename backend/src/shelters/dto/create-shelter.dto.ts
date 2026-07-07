import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  animalCapacity?: number;

  @IsOptional()
  @IsString()
  logo?: string;
}
