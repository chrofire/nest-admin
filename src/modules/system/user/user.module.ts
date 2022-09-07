import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { Menu } from 'src/entities/menu.entity'
import { Role } from 'src/entities/role.entity'
import { RoleMenu } from 'src/entities/roleMenu.entity'
import { User } from 'src/entities/user.entity'
import { UserRole } from 'src/entities/userRole.entity'
import { CommonModule } from 'src/modules/common.module'
import { DeptService } from '../dept/dept.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, Dept, UserRole, Role, RoleMenu, Menu]), forwardRef(() => CommonModule)],
    controllers: [UserController],
    providers: [UserService, DeptService],
    exports: [UserService]
})
export class UserModule {}