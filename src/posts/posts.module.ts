import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), FirebaseModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
