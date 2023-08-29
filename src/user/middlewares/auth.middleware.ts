import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { ExpressRequest } from "src/types/expressRequest.interface";
import { UserService } from "src/user/user.service";
import { JWT_SECRET } from "src/config";
import { UserEntity } from "../user.entity";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly userService: UserService) {}

    async use(req: ExpressRequest, res: Response, next: NextFunction) {

        console.log('======>authMiddle', req.headers);

        if(!req.headers.authorization){
            req.user = null
            next();
            return;
        }

        // Ví dụ: nếu chuỗi là "Bearer token123", thì sau khi cắt sẽ thành mảng ["Bearer", "token123"].
        // Lấy phần tử thứ 1 của mảng kết quả sau khi cắt, nghĩa là lấy phần tử "token123" .
        const token =  req.headers.authorization.split(' ')[1]

        try {
            const decode = verify(token, JWT_SECRET);
            console.log("=============> decode", decode);
            const user: UserEntity = await this.userService.findById(decode.id);
            req.user = user;
            next();
        } catch (err) {
          req.user = null;
          next();
        }
    }

}