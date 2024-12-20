import {
    IsString,
    IsEmail,
    MinLength,
    IsNotEmpty,
  } from 'class-validator';
  export class LoginDto{
    @IsEmail({},{message:'ایمیل وارد شده صحیح نیست '})
    @IsNotEmpty({ message: 'ایمیل الزامی است' })
    email:string;

  @IsString({ message: 'رمز عبور لازم است و باید یک رشته باشد.' })
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد.' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  password: string;
  
}