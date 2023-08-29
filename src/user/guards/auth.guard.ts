import { ExpressRequest } from 'src/types/expressRequest.interface';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
       const req = context.switchToHttp().getRequest<ExpressRequest>();

       if(req.user){
        return true;
       }
       throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    } 
}