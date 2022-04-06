import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { User } from 'src/entities/user.entity'
import { UserRole } from 'src/entities/userRole.entity'
import { CommonModule } from 'src/modules/common.module'
import { DeptService } from '../dept/dept.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, Dept, UserRole]), CommonModule],
    controllers: [UserController],
    providers: [UserService, DeptService]
})
export class UserModule {}