import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DeptService } from './dept.service'

@Controller('dept')
@ApiTags('部门')
export class DeptController {
    constructor (private readonly deptService: DeptService) {}
    
    @Post('add')
    @ApiOperation({ summary: '添加部门' })
    async add () {
        this.deptService.addDept()
    }
}