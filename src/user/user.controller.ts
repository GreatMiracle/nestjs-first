import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserResponseDTOInterface } from "./dto/user.response.dto";
import { ExpressRequest } from "src/types/expressRequest.interface";
import { UserDecorator } from "./decorators/user.decorator";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";


@Controller("/user")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') loginDto: LoginUserDto,
    // ): Promise<UserResponseDTOInterface> {
        ): Promise<UserResponseInterface> {
        console.log('loginDto', loginDto);
        const user = await this.userService.login(loginDto);
        // return this.userService.buildUserResponseDTO(user);
        return this.userService.buildUserResponse(user);
    }

    @Get()
    @UseGuards(AuthGuard)
    async currentUser(
        //   @Req() request: ExpressRequest,
        @UserDecorator() user: UserEntity
    ): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user);
    }


    @Put("/update")
    @UseGuards(AuthGuard)
    async updateUser(
        @UserDecorator('id') userId: number,
        @Body('user') userDtoReq: UpdateUserDto,

    ): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(userId, userDtoReq);
        return this.userService.buildUserResponse(user);
    }

}