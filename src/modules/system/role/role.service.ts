import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { difference } from 'lodash'
import { Menu } from 'src/entities/menu.entity'
import { Role } from 'src/entities/role.entity'
import { RoleMenu } from 'src/entities/roleMenu.entity'
import { genVagueSearchObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { EntityManager, Repository } from 'typeorm'
import { AddRoleDto, FindRoleListDto, FindRolePageListDto, UpdateRoleDto } from './role.dto'

interface IFindRoleList extends Role {
    roleMenu?: RoleMenu[],
    menus?: number[]
}

@Injectable()
export class RoleService {
    constructor (
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(RoleMenu) private readonly roleMenuRepository: Repository<RoleMenu>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) {}

    // 添加角色
    async addRole (dto: AddRoleDto) {
        try {
            const { menuIdList = [], ...args } = dto
            await this.entityManager.transaction(async (manager) => {
                // 插入角色信息
                const role = await manager.insert(Role, args)
                const {
                    identifiers: [{ id: roleId }]
                } = role
                // 角色关联菜单
                for (let i = 0; i < menuIdList.length; i++) {
                    const menuId = menuIdList[i]
                    const menu = await manager.findOneBy(Menu, {
                        id: menuId
                    })
                    if (!menu) throw new Error(`不存在id为${menuId}的菜单记录`)
                    await manager.insert(RoleMenu, { roleId, menuId })
                }
            })
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 删除角色
    async deleteRole (id: number) {
        try {
            const res = await this.roleRepository.delete(id)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 更新角色
    async updateRole (dto: UpdateRoleDto) {
        try {
            const { id, menuIdList, ...args } = dto
            // 角色已关联菜单id列表
            const originMenuIdList = (
                await this.roleMenuRepository.find({
                    where: {
                        roleId: id
                    }
                })
            ).map((item) => item.menuId)

            // 对比新增
            const diffInsert = difference(menuIdList, originMenuIdList)
            // 对比删除
            const diffDelete = difference(originMenuIdList, menuIdList)

            await this.entityManager.transaction(async (manager) => {
                // 更新角色信息
                await manager.update(Role, id, args)

                // 对比新增
                for (let i = 0; i < diffInsert.length; i++) {
                    const menuId = diffInsert[i]
                    const menu = await manager.findOneBy(Menu, {
                        id: menuId
                    })
                    if (!menu) throw new Error(`不存在id为${menuId}的菜单记录`)
                    await manager.insert(RoleMenu, { roleId: id, menuId })
                }

                // 对比删除
                for (let i = 0; i < diffDelete.length; i++) {
                    const menuId = diffDelete[i]
                    const menu = await manager.findOneBy(Menu, {
                        id: menuId
                    })
                    if (!menu) throw new Error(`不存在id为${menuId}的菜单记录`)
                    await manager.delete(RoleMenu, { roleId: id, menuId })
                }
            })
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 查询角色列表
    async findRoleList (dto: FindRoleListDto) {
        try {
            const vagueSearchObj = genVagueSearchObj(dto)
            const [list, total] = await this.roleRepository.findAndCount({
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

    // 分页查询角色列表
    async findRolePageList (dto: FindRolePageListDto) {
        try {
            const { pageNum, pageSize, ...args } = dto
            const vagueSearchObj = genVagueSearchObj(args)
            const [_list, total] = await this.roleRepository
                .createQueryBuilder('role')
                .leftJoinAndMapMany(
                    'role.roleMenu',
                    RoleMenu,
                    'roleMenu',
                    'role.id = roleMenu.roleId'
                )
                .where({ ...vagueSearchObj })
                .skip(pageSize * (pageNum - 1))
                .take(pageSize)
                .getManyAndCount()

            const list = (_list as IFindRoleList[]).map((user) => {
                const { roleMenu, ...args } = user
                const menus = roleMenu.map((roleMenu) => {
                    return roleMenu.menuId
                })
                return {
                    ...args,
                    menus
                }
            })

            return {
                list,
                pageNum,
                pageSize,
                total
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 根据角色名称查找角色列表
    async findRolesByName (name: string) {
        return await this.roleRepository.find({
            where: {
                name
            }
        })
    }
}
