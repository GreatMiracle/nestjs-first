import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { sign } from 'jsonwebtoken';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}
    
      async createUser( createUserDto: CreateUserDto ): Promise<UserEntity> {

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        console.log('<<<<<<<<<<========= newUser =========>>>>>>>>', newUser);

        return await this.userRepository.save(newUser);
      }

      generateJwt(user: UserEntity) :string{
        return sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            "super-secret",
        )
      }

      buildUserResponse(user: UserEntity): any {
        return {
            userKien :{
                ...user,
                token: this.generateJwt(user),

            }
        }
      }


}