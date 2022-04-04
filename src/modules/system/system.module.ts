import { Module } from '@nestjs/common'
import { DeptModule } from './dept/dept.module'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [DeptModule, RoleModule, UserModule]
})
export class SystemModule {}