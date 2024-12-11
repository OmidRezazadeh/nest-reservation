import { Body, Controller } from "@nestjs/common";
import { createUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "src/auth/auth.service";

@Controller('auth')
export class AuthController {
 constructor(private readonly authService: AuthService) {}
  register(@Body() createUserDto:createUserDto) {
    return this.authService.register(createUserDto);
  }
}
