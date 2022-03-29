import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { ResponseData } from 'src/utils/responseData'
import { Repository } from 'typeorm'
import { AddDeptDto } from './dept.dto'

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

    // 查询部门列表
    async findDeptList () {
        try {
            const [list, total] = await this.deptRepository.findAndCount()
            return {
                list,
                total
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }
}
