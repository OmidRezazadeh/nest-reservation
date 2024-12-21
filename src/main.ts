import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Session configuration
  app.use(
    session({
      secret: process.env.JWT_SECRET, // Secret from .env file
    }),
  );

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error for unknown properties
    }),
  );

  // Initialize Passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000); // Start the application on port 3000
}

bootstrap();
