import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configuration CORS
  const corsOptions: CorsOptions = {
    origin: 'https://rococo-otter-2b11ca.netlify.app',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  };
  app.enableCors(corsOptions);
  
  // Configuration des sessions
  app.use(
    session({
      name: 'NestJs_Session_Id',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 600000 },
    }),
  );

  // Utilisation de cookie-parser
  app.use(cookieParser());

  // Initialisation de Passport.js
  app.use(passport.initialize());
  app.use(passport.session());

  // Configuration du serveur statique pour les téléversements
  app.useStaticAssets(path.join(__dirname, './uploads'));

  // Utilisation des tuyaux de validation globaux
  app.useGlobalPipes(new ValidationPipe());

  // Écoute du port 5001
  await app.listen(5001);
}

bootstrap();
