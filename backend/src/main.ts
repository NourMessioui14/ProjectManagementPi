import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    exposedHeaders: 'Set-Cookie',

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Authorization',
    ],

  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      name: 'NestJs_Session_Id',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 600000 },
    }),
  );
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(5001);
}
bootstrap();