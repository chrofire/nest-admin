import { SetMetadata } from '@nestjs/common'

// 开放权限
export const OpenAuth = () => SetMetadata('OpenAuth', true)