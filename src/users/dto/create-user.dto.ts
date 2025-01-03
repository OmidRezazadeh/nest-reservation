import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,  // Add this import
} from 'class-validator';

export class createUserDto {
  @IsEmail({},{message:'ایمیل وارد شده صحیح نیست '})
  @IsNotEmpty({ message: 'ایمیل الزامی است' })
  email: string;

  @IsString({ message: 'نام الزامی است و باید یک رشته باشد' })
  @IsNotEmpty({ message: 'نام الزامی است' })
  @MinLength(2, { message: 'نام باید حداقل 2 کاراکتر باشد' })
  name: string;

  @IsString({ message: 'رمز عبور لازم است و باید یک رشته باشد.' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد.' })
  password: string;
}