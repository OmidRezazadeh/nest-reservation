import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsDate,
  MinLength,
} from 'class-validator';

export  class createUserDto {
  @IsEmail({},{message:'ایمیل وارد شده صحیح نیست '})
  email:string;

  @IsString({ message: 'نام الزامی است و باید یک رشته باشد' })
  @MinLength(2, { message: 'نام باید حداقل 2 کاراکتر باشد' })
  name: string;
  @IsString({ message: 'رمز عبور لازم است و باید یک رشته باشد.' })
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد.' })
  password: string;
  @IsOptional()
  @IsNumber({}, { message: 'شناسه نقش باید یک عدد باشد.' })
  role_id: number;

  @IsOptional()
  @IsDate({ message: 'ایجاد در تاریخ باید معتبر باشد.' })
  created_at?: Date;

  @IsOptional()
  @IsDate({ message: 'به روز رسانی در باید یک تاریخ معتبر باشد.' })
  updated_at?: Date;
}