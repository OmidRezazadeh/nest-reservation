import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EventsGateway } from './events/events.gateway';
// Removed the import statement for WsAdapter as it causes an error

async function bootstrap() {
  // Load environment variables
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // Removed the useWebSocketAdapter line as WsAdapter is not defined

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
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // Global serialization

  // Initialize Passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`); // Start the application on port 3000
   

  // const eventGateway= app.get(EventsGateway);
  // setInterval(()=> eventGateway.sendMessage(),2000)
}

bootstrap();
