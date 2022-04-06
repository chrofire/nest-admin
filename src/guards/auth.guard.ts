import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ResponseData } from 'src/utils/responseData'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}
    async canActivate (context: ExecutionContext): Promise<boolean> {
        // @OpenAuth 装饰的接口跳过验证
        const isOpenAuth = this.reflector.get('OpenAuth', context.getHandler())
        if (isOpenAuth) return true

        const request = context.switchToHttp().getRequest()
        
        // 获取token
        const token = request.headers['authorization']
        
        if (!token) ResponseData.error('鉴权未通过', HttpStatus.UNAUTHORIZED)

        try {
            const user = this.jwtService.verify(token.replace('Bearer ', ''))
            request.user = user
        } catch (err) {
            ResponseData.error('鉴权未通过', HttpStatus.UNAUTHORIZED)
        }
        
        return true
    }
}