
import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
export class productPaginationDto{
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    page:number=1

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit?: number = 10;
    
}