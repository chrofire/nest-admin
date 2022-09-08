import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { User } from 'src/entities/user.entity'
import { DeptController } from './dept.controller'
import { DeptService } from './dept.service'

@Module({
    imports: [TypeOrmModule.forFeature([Dept, User])],
    controllers: [DeptController],
    providers: [DeptService]
})
export class DeptModule {}