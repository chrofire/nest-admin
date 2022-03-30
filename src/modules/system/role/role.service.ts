import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'src/entities/role.entity'
import { genVagueSearchObj, genPageOptionsObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { Repository } from 'typeorm'
import { AddRoleDto, FindRoleListDto, FindRolePageListDto, UpdateRoleDto } from './role.dto'

@Injectable()
export class RoleService {
    constructor (@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    // 添加角色
    async addRole (dto: AddRoleDto) {
        try {
            const res = await this.roleRepository.save(dto)
            return res
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
            const { id } = dto
            const res = await this.roleRepository.update(id, dto)
            return res
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
            const pageOptions = genPageOptionsObj({ pageNum, pageSize })
            const [list, total] = await this.roleRepository.findAndCount({
                where: vagueSearchObj,
                ...pageOptions
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
}
