import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';

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
      synchronize: false, // Make sure it's false for migrations
      migrations: [__dirname + '/migrations/*{.ts,.js}'],

    }),

    UsersModule,

    ProductsModule,

    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
