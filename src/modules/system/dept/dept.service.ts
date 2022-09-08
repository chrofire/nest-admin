import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { User } from 'src/entities/user.entity'
import { genVagueSearchObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { In, Repository } from 'typeorm'
import { AddDeptDto, FindDeptListDto, UpdateDeptDto } from './dept.dto'

@Injectable()
export class DeptService {
    constructor (
        @InjectRepository(Dept) private readonly deptRepository: Repository<Dept>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    // 添加部门
    async addDept (dto: AddDeptDto) {
        try {
            const res = await this.deptRepository.save(dto)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 删除部门
    async deleteDept (id: number) {
        try {
            const res = await this.deptRepository.delete(id)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 更新部门
    async updateDept (dto: UpdateDeptDto) {
        try {
            const { id } = dto
            const res = await this.deptRepository.update(id, dto)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 查询部门列表
    async findDeptList (dto: FindDeptListDto) {
        try {
            const vagueSearchObj = genVagueSearchObj(dto)
            const [list, total] = await this.deptRepository.findAndCount({
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

    // 根据部门id查询用户列表
    async findUsersByDeptId (deptId: number) {
        return await this.userRepository.find({ where: { deptId }})
    }

    // 根据部门id查询关联子级部门的用户列表
    async findUsersInSubDeptsByDeptId (id: number) {
        const { list } = await this.findDeptList({})

        const findIds = (id) => {
            return list.flatMap((item) => {
                const ids = []
                if (item.parentId === id) {
                    ids.push(item.id, ...findIds(item.id))
                }
                return ids
            })
        }

        const users = await this.userRepository.find({ where: {
            deptId: In(findIds(id))
        }})

        return users
    }
}
