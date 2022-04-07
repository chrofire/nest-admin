import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { difference, flattenDeep, unionBy } from 'lodash'
import { Menu } from 'src/entities/menu.entity'
import { Role } from 'src/entities/role.entity'
import { RoleMenu } from 'src/entities/roleMenu.entity'
import { User } from 'src/entities/user.entity'
import { UserRole } from 'src/entities/userRole.entity'
import { Bcrypt } from 'src/utils/bcrypt'
import { genVagueSearchObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { EntityManager, In, Repository } from 'typeorm'
import { DeptService } from '../dept/dept.service'
import { AddUserDto, FindUserListDto, FindUserPageListDto, LoginDto, UpdateUserDto } from './user.dto'

interface IFindUserList extends User {
    userRole?: ({ role: Role })[],
    roles?: Role[]
}
@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
        @InjectEntityManager() private readonly entityManager: EntityManager,
        private readonly deptService: DeptService,
        private readonly jwtService: JwtService
    ) {}

    // 添加用户
    async addUser (dto: AddUserDto) {
        try {
            // 密码加密
            dto.password = Bcrypt.encrypt(dto.password)

            // 插入用户数据
            const { roleIdList = [], ...args } = dto
            await this.entityManager.transaction(async (manager) => {
                // 插入用户信息
                const user = await manager.insert(User, args)
                const { identifiers: [{ id: userId }] } = user
                // 用户关联角色
                for (let i = 0; i < roleIdList.length; i++) {
                    const roleId = roleIdList[i]
                    const role = await manager.findOneBy(Role, {
                        id: roleId
                    })
                    if (!role) throw new Error(`不存在id为${roleId}的角色记录`)
                    await manager.insert(UserRole, { userId, roleId })
                }
            })
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 删除用户
    async deleteUser (id: number) {
        try {
            const res = await this.userRepository.delete(id)
            await this.userRoleRepository.delete({ userId: id })
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 更新用户
    async updateUser (dto: UpdateUserDto) {
        try {
            const { id, roleIdList, ...args } = dto
            // 用户已关联的角色id列表
            const originRoleIdList = (await this.userRoleRepository.find({
                where: {
                    userId: id
                }
            })).map((item) => item.roleId)
            
            // 对比新增
            const diffInsert = difference(roleIdList, originRoleIdList)
            // 对比删除
            const diffDelete = difference(originRoleIdList, roleIdList)
            
            await this.entityManager.transaction(async (manager) => {
                // 更新用户信息
                await manager.update(User, id, args)
                
                // 对比新增
                for (let i = 0; i < diffInsert.length; i++) {
                    const roleId = diffInsert[i]
                    const role = await manager.findOneBy(Role, {
                        id: roleId
                    })
                    if (!role) throw new Error(`不存在id为${roleId}的角色记录`)
                    await manager.insert(UserRole, { userId: id, roleId })
                }

                // 对比删除
                for (let i = 0; i < diffDelete.length; i++) {
                    const roleId = diffDelete[i]
                    const role = await manager.findOneBy(Role, {
                        id: roleId
                    })
                    if (!role) throw new Error(`不存在id为${roleId}的角色记录`)
                    await manager.delete(UserRole, { userId: id, roleId })
                }
            })
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 查询用户列表
    async findUserList (dto: FindUserListDto) {
        try {
            const { deptId, ...args } = dto
            const searchObj = genVagueSearchObj(args)

            if (typeof deptId === 'number') {
                const { list: deptFullList } = await this.deptService.findDeptList({})
                const deptList = [deptId]
                
                addDeptId(deptId)
                function addDeptId (deptId) {
                    const children = deptFullList.filter((item) => item.parentId === deptId)
                    children.forEach((item) => {
                        deptList.push(item.id)
                        addDeptId(item.id)
                    })
                }
                
                Object.assign(searchObj, {
                    deptId: In(deptList)
                })
            }

            const [_list, total] = await this.userRepository.createQueryBuilder('user')
                .leftJoinAndMapMany('user.userRole', UserRole, 'userRole', 'user.id = userRole.userId')
                .leftJoinAndMapOne('userRole.role', Role, 'role', 'userRole.roleId = role.id')
                .select(['user', 'userRole.id', 'role'])
                .where({ ...searchObj })
                .getManyAndCount()

            const list = (_list as IFindUserList[]).map((user) => {
                const { userRole, ...args } = user
                const roles = userRole.map((userRole) => {
                    return userRole.role
                })
                return {
                    ...args,
                    roles
                }
            })

            return {
                list,
                total
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 分页查询用户列表
    async findUserPageList (dto: FindUserPageListDto) {
        try {
            const { pageNum, pageSize, deptId, ...args } = dto
            const searchObj = genVagueSearchObj(args)

            if (typeof deptId === 'number') {
                const { list: deptFullList } = await this.deptService.findDeptList({})
                const deptList = [deptId]
                
                addDeptId(deptId)
                function addDeptId (deptId) {
                    const children = deptFullList.filter((item) => item.parentId === deptId)
                    children.forEach((item) => {
                        deptList.push(item.id)
                        addDeptId(item.id)
                    })
                }
                
                Object.assign(searchObj, {
                    deptId: In(deptList)
                })
            }

            const [_list, total] = await this.userRepository.createQueryBuilder('user')
                .leftJoinAndMapMany('user.userRole', UserRole, 'userRole', 'user.id = userRole.userId')
                .leftJoinAndMapOne('userRole.role', Role, 'role', 'userRole.roleId = role.id')
                .select(['user', 'userRole.id', 'role'])
                .where({ ...searchObj })
                .skip(pageSize * (pageNum - 1))
                .take(pageSize)
                .getManyAndCount()

            const list = (_list as IFindUserList[]).map((user) => {
                const { userRole, ...args } = user
                const roles = userRole.map((userRole) => {
                    return userRole.role
                })
                return {
                    ...args,
                    roles
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

    // 根据用户名查找用户
    async findUserByUsername (username: string) {
        const user = await this.userRepository.createQueryBuilder('user')
            .where({ username })
            .addSelect(['user.password'])
            .getOne()
        return user
    }

    // 登录用户
    async loginUser (dto: LoginDto) {
        try {
            const { username, password } = dto

            // 检查用户是否存在
            const user = await this.findUserByUsername(username)
            if (!user) return ResponseData.error('不存在该用户')

            // 对比密码
            const validPassword = Bcrypt.decrypt(password, user.password)
            if (!validPassword) ResponseData.error('密码错误')

            // 生成token
            const token = `Bearer ${this.jwtService.sign({ ...user })}`

            // 删除密码字段
            Reflect.deleteProperty(user, 'password')

            return {
                token,
                userInfo: user
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 查询当前用户信息
    async findCurrentUserInfo (id: number) {
        const user: any = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndMapMany('user.userRole', UserRole, 'userRole', 'user.id = userRole.userId')
            .leftJoinAndMapOne('userRole.role', Role, 'role', 'userRole.roleId = role.id')
            .leftJoinAndMapMany('userRole.roleMenu', RoleMenu, 'roleMenu', 'userRole.roleId = roleMenu.roleId')
            .leftJoinAndMapOne('roleMenu.menu', Menu, 'menu', 'roleMenu.menuId = menu.id')
            // .where('menu.state = :state', { state: 0 })
            // .where('role.state = :state', { state: 0 })
            // .where('user.id = :id', { id })
            .where('user.id = :id and role.state = :state and menu.state = :state', { id, state: 0 })
            .getOne()
        
        // 用户所有启用的角色
        const roles: Role[] = user.userRole.map((_userRole) => {
            return _userRole.role
        })

        // 用户所有启用的角色具备的所有启用的菜单
        const allMenuList = user.userRole.map((_userRole) => {
            return _userRole.roleMenu.map((_roleMenu) => {
                return _roleMenu.menu
            })
        })

        // 所有菜单扁平化，并根据id去重
        const menuList: Menu[] = unionBy(flattenDeep(allMenuList), 'id')
       
        // 用户具有的目录和菜单
        const menus = menuList.filter((item) => [0, 1].includes(item.type))

        // 用户具有的接口权限
        const permissions = menuList.filter((item) => [2].includes(item.type))
        
        Reflect.deleteProperty(user, 'userRole')
        Object.assign(user, {
            roles,
            menus,
            permissions
        })
        return user
    }
}
