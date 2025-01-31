import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';

export type PostModel = {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
};

const data: PostModel[] = [
  {
    id: 1,
    author: '손흥민',
    title: '토트넘',
    content: '손절 ㄱ',
    likeCount: 10,
    commentCount: 20,
  },
  {
    id: 2,
    author: '황희찬',
    title: '울버햄튼',
    content: '씨찬히형',
    likeCount: 15,
    commentCount: 30,
  },
  {
    id: 3,
    author: '김민재',
    title: '뮌헨',
    content: '벽민재',
    likeCount: 20,
    commentCount: 50,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException();
    return post;
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });
    const newPost = await this.postsRepository.save(post);
    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException();
    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;
    const newPost = await this.postsRepository.save(post);
    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException();
    await this.postsRepository.delete(postId);
    return postId;
  }
}
