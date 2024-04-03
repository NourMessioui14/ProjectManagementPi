import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
<<<<<<< HEAD
=======
import * as cookieParser from 'cookie-parser';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
<<<<<<< HEAD
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
=======
    exposedHeaders: 'Set-Cookie',

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Authorization',
    ],

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
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
<<<<<<< HEAD
=======
  app.use(cookieParser());
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(5001);
}
bootstrap();