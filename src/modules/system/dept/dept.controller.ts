import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ResponseData } from 'src/utils/responseData'
import { AddDeptDto } from './dept.dto'
import { DeptService } from './dept.service'

@Controller('dept')
@ApiTags('部门')
export class DeptController {
    constructor (private readonly deptService: DeptService) {}
    
    @Post('add')
    @ApiOperation({ summary: '添加部门' })
    async add (@Body() dto: AddDeptDto) {
        const res = await this.deptService.addDept(dto)
        return ResponseData.success(res, '添加成功')
    }

    @Get('list')
    @ApiOperation({ summary: '查询部门列表' })
    async list () {
        const res = await this.deptService.findDeptList()
        return ResponseData.success(res, '查询成功')
    }
}