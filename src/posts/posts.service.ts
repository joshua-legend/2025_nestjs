import { Injectable, NotFoundException } from '@nestjs/common';

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
  getAllPosts() {
    return data;
  }
  getPostById(id: number) {
    const post = data.find((post) => post.id === id);
    if (!post) throw new NotFoundException();
    return post;
  }
  createPost(author: string, title: string, content: string) {
    const newPost: PostModel = {
      id: data[data.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    return [...data, newPost];
  }

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = data.find((post) => post.id === postId);
    if (!post) throw new NotFoundException();
    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;
    const newData = data.map((v) => (v.id === postId ? post : v));
    return post;
  }

  deletePost(postId: number) {
    return data.filter((v) => v.id !== postId);
  }
}
