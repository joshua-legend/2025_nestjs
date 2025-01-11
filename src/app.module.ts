import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  //다른 모듈 필요 쀼쀼🧡
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})

// 그럼 이새끼는 어디임
export class AppModule {}
