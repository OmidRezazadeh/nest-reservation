import {
    IsString,
    IsEmail,
    MinLength,
  } from 'class-validator';
  export class LoginDto{
    @IsEmail({},{message:'ایمیل وارد شده صحیح نیست '})
    email:string;

  @IsString({ message: 'رمز عبور لازم است و باید یک رشته باشد.' })
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد.' })
  password: string;
  
}