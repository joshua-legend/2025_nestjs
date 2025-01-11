import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  // 클래스 그대로 넣음
  // 여기서 ioc 알아서 먹음 낼름
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
