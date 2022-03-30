import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { genVagueSearchObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { Repository } from 'typeorm'
import { AddDeptDto, FindDeptListDto, UpdateDeptDto } from './dept.dto'

@Injectable()
export class DeptService {
    constructor (@InjectRepository(Dept) private readonly deptRepository: Repository<Dept>) {}

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
}
