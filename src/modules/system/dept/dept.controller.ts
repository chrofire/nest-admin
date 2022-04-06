import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ResponseData } from 'src/utils/responseData'
import { AddDeptDto, DeleteDeptDto, FindDeptListDto, UpdateDeptDto } from './dept.dto'
import { DeptService } from './dept.service'

@Controller('dept')
@ApiTags('部门')
@ApiBearerAuth()
export class DeptController {
    constructor (private readonly deptService: DeptService) {}
    
    @Post('add')
    @ApiOperation({ summary: '添加部门' })
    async add (@Body() dto: AddDeptDto) {
        await this.deptService.addDept(dto)
        return ResponseData.success(null, '添加成功')
    }

    @Post('delete')
    @ApiOperation({ summary: '删除部门' })
    async delete (@Body() dto: DeleteDeptDto) {
        const { id } = dto
        const { affected } = await this.deptService.deleteDept(id)
        if (affected < 1) {
            return ResponseData.error(`删除失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '删除成功')
    }

    @Post('update')
    @ApiOperation({ summary: '更新部门' })
    async update (@Body() dto: UpdateDeptDto) {
        const { id } = dto
        const { affected } = await this.deptService.updateDept(dto)
        if (affected < 1) {
            return ResponseData.error(`更新失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '更新成功')
    }

    @Get('list')
    @ApiOperation({ summary: '查询部门列表' })
    async list (@Query() dto: FindDeptListDto) {
        const res = await this.deptService.findDeptList(dto)
        return ResponseData.success(res, '查询成功')
    }
}