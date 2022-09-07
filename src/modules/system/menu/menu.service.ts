import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Menu } from 'src/entities/menu.entity'
import { Role } from 'src/entities/role.entity'
import { RoleMenu } from 'src/entities/roleMenu.entity'
import { genVagueSearchObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { Repository } from 'typeorm'
import { AddMenuDto, FindMenuListDto, UpdateMenuDto } from './menu.dto'

@Injectable()
export class MenuService {
    constructor (@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {}

    // 添加菜单
    async addMenu (dto: AddMenuDto) {
        try {
            const res = await this.menuRepository.save(dto)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 删除菜单
    async deleteMenu (id: number) {
        try {
            const res = await this.menuRepository.delete(id)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 更新菜单
    async updateMenu (dto: UpdateMenuDto) {
        try {
            const { id } = dto
            const res = await this.menuRepository.update(id, dto)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 查询菜单列表
    async findMenuList (dto: FindMenuListDto) {
        try {
            const vagueSearchObj = genVagueSearchObj(dto)
            const [list, total] = await this.menuRepository.findAndCount({
                where: vagueSearchObj
            })
            return {
                list,
                total
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 根据菜单名称查找菜单列表
    async findMenusByName (name: string) {
        return await this.menuRepository.find({
            where: {
                name
            }
        })
    }

    // 根据id查找子级菜单列表
    async findChildrenMenusById (id: number) {
        return await this.menuRepository.find({
            where: {
                parentId: id
            }
        })
    }

    // 根据id查找关联此菜单的角色列表
    async findRolesById (id: number) {
        const menu: any = await this.menuRepository.createQueryBuilder('menu')
            .leftJoinAndMapMany('menu.menuRole', RoleMenu, 'menuRole', 'menu.id = menuRole.menuId')
            .leftJoinAndMapOne('menuRole.role', Role, 'role', 'menuRole.roleId = role.id')
            .where('menu.id = :id', { id })
            .getOne()
        
        const roles: Role[] = menu.menuRole.map((_menuRole) => {
            return _menuRole.role
        })

        return roles
    }
}
