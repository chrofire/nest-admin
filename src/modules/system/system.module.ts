import { Module } from '@nestjs/common'
import { DeptModule } from './dept/dept.module'
import { RoleModule } from './role/role.module'

@Module({
    imports: [DeptModule, RoleModule]
})
export class SystemModule {}