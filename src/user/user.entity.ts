import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

function hash(password: string, arg1: number): string | PromiseLike<string> {
    throw new Error("Function not implemented.");
}

