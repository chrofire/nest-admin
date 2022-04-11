import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from 'src/modules/system/user/user.service'
import { ResponseData } from 'src/utils/responseData'

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor (
        private readonly reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate (context: ExecutionContext): Promise<boolean> {
        // 当前请求的权限标识
        const currentReqPerm = this.reflector.get('Permission', context.getHandler())
        // 无权限标识，请求不需要权限
        if (!currentReqPerm) return true

        const req: Request = context.switchToHttp().getRequest()
        const user = req['user']
        if (!user) ResponseData.error('角色未登录', HttpStatus.UNAUTHORIZED)

        // 获取当前用户具有的接口权限
        const { permissions } = await this.userService.findCurrentUserInfo(user.id)
        const permissionList = permissions.map((item) => item.permission)

        // 判断当前用户是否具有当前请求的权限
        if (permissionList.includes(currentReqPerm)) return true
        ResponseData.error('无权访问', HttpStatus.FORBIDDEN)
    }
}
