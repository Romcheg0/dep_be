import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { BlockListService } from "src/block-list/block-list.service";

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(@Inject(BlockListService) private blockListService: BlockListService, private jwtService: JwtService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const req = context.switchToHttp().getRequest()
    try{
      const authHeader = req.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]
      console.log(authHeader);
      
      if(bearer !== 'Bearer' || !token){
        throw new UnauthorizedException({message: "Non authorized access"})
      }
      return this.blockListService.findAll().then(res=>{        
        if(res.find(item=>item.token===token)){
          throw new UnauthorizedException({message: "Non authorized access"})
        }
        else{
          try{
            const user = this.jwtService.verify(token, {secret: process.env.ACCESS_PRIVATE_KEY})
            req.user = user
            return true
          }
          catch(e){
            throw new UnauthorizedException({message: 'Non authorized access'})
          }
        }
      })
    }
    catch(e){
      throw new UnauthorizedException({message: "Non authorized access"})
    }
  }
}