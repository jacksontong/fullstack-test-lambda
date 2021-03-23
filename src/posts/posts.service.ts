import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FirestoreService } from '../firebase/firestore/firestore.service';
import _ from 'lodash';

@Injectable()
export class PostsService {
  readonly FIRESTORE_COLLECTION = 'posts';

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly firestoreService: FirestoreService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = new Post();
    post.title = createPostDto.title;
    post.body = createPostDto.body;
    post.image = createPostDto.image;

    // add new post to postgres
    const newPost = await this.postsRepository.save(post);

    // add new doc to firestore
    await this.firestoreService.set(
      this.FIRESTORE_COLLECTION,
      newPost.id.toString(),
      _.chain(post)
        .pickBy((val) => val !== undefined)
        .value(),
    );

    return newPost;
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOne(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return Promise.all([
      this.postsRepository.update(id, updatePostDto),
      this.firestoreService.set(
        this.FIRESTORE_COLLECTION,
        id.toString(),
        _.chain(updatePostDto)
          .pickBy((val) => val !== undefined)
          .value(),
      ),
    ]);
  }

  /**
   * Delete post from firestore and postgres
   * @param id
   */
  async remove(id: number) {
    await Promise.all([
      this.postsRepository.delete(id),
      this.firestoreService.delete(this.FIRESTORE_COLLECTION, id.toString()),
    ]);
  }
}
