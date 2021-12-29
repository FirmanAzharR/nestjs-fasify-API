import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoggingInterceptor } from './middleware/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'firman',
      password: 'alifia',
      database: 'mydb',
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities:true
    }),
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user'); //for all request on path user
      //.forRoutes({ path: 'user/row', method: RequestMethod.GET }); //for spesifict router path
  }
}
