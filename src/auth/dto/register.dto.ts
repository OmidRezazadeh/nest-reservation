import {
    IsString,
    IsEmail,
    MinLength,
  } from 'class-validator';
  export class registerDto{
    @IsEmail({},{message:'ایمیل وارد شده صحیح نیست '})
    email:string;
    
  @IsString({ message: 'نام الزامی است و باید یک رشته باشد' })
  @MinLength(2, { message: 'نام باید حداقل 2 کاراکتر باشد' })
  name: string;

  @IsString({ message: 'رمز عبور لازم است و باید یک رشته باشد.' })
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد.' })
  password: string;
  
}