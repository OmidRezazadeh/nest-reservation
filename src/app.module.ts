import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { SeederService } from './seeder/seeder.service';
import { Role } from "src/roles/entities/role.entity";
import { SeederModule } from './seeder/seeder.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'reservation',
      entities: [User,Role], // Add all your entities here
      synchronize: true, // Don't use in production
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    UsersModule,
    ProductsModule,
    RolesModule,
    SeederModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
