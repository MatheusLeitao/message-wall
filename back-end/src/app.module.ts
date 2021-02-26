import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormOptions from "./config/orm";
import RepoModule from './repo.module';
import UserResolver from "./resolvers/user.resolver";
import { GraphQLModule } from '@nestjs/graphql';
import MessageResolver from './resolvers/message.resolver';


const graphQLImports: any = [UserResolver, MessageResolver];


@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql', playground: true
    }),
    ...graphQLImports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

