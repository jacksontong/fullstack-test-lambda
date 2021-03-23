import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  image: string;
}
