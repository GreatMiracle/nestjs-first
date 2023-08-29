import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../user.entity";
import { ExpressRequest } from "src/types/expressRequest.interface";


export const UserDecorator = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req:ExpressRequest = ctx.switchToHttp().getRequest();

    if(!req.user){
        null;
    }

    if(data){
        return req.user[data];
    }

    return req.user;
});