import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from 'src/entities/menu.entity'
import { Role } from 'src/entities/role.entity'
import { RoleMenu } from 'src/entities/roleMenu.entity'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
    imports: [TypeOrmModule.forFeature([Role, RoleMenu, Menu])],
    controllers: [RoleController],
    providers: [RoleService]
})
export class RoleModule {}
