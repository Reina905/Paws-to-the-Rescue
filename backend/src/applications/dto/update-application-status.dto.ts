import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsNotEmpty()
  @IsIn(['approved', 'rejected'])
  status: string;
}
