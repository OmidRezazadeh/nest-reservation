import{
    IsString,
    IsNotEmpty,
    MinLength,
    IsNumber,
    IsOptional
} from 'class-validator'


export class CreateProductDto {
    @IsString({ message: ' عنوان الزامی است و باید یک رشته باشد' })
    @IsNotEmpty({ message: 'عنوان الزامی است' })
    @MinLength(2, { message: 'نام باید حداقل 2 کاراکتر باشد عنوان' })
    title: string;
  
    @IsString({ message: 'توضیحات الزامی است و باید یک رشته باشد' })
    @IsNotEmpty({ message: 'توضیحات الزامی است' })
    @MinLength(2, { message: 'توضیحات باید حداقل 2 کاراکتر باشد' })
    description: string;
  
    @IsNumber({}, { message: 'قیمت باید یک عدد باشد' })
    @IsNotEmpty({ message: 'قیمت الزامی است' })
    price: number;

  @IsOptional()
 user_id: number;
    
}
