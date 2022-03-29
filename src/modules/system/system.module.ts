import { Module } from '@nestjs/common'
import { DeptModule } from './dept/dept.module'

@Module({
    imports: [DeptModule]
})
export class SystemModule {}