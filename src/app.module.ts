import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/entities/product.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,Product], // Add all your entities here
      synchronize: true, // Don't use in production
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  consumer.apply(LoggerMiddleware).forRoutes('*')    
  }
}
