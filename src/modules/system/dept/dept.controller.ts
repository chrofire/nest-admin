import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Permission } from 'src/decorators/permission.decorator'
import { ResponseData } from 'src/utils/responseData'
import { AddDeptDto, DeleteDeptDto, FindDeptListDto, UpdateDeptDto } from './dept.dto'
import { DeptService } from './dept.service'

@Controller('dept')
@ApiTags('部门')
@ApiBearerAuth()
export class DeptController {
    constructor (private readonly deptService: DeptService) {}
    
    @Post('add')
    @Permission('system:dept:add')
    @ApiOperation({ summary: '添加部门' })
    async add (@Body() dto: AddDeptDto) {
        await this.deptService.addDept(dto)
        return ResponseData.success(null, '添加成功')
    }

    @Post('delete')
    @Permission('system:dept:delete')
    @ApiOperation({ summary: '删除部门' })
    async delete (@Body() dto: DeleteDeptDto) {
        const { id } = dto

        const users = await this.deptService.findUsersByDeptId(id)
        if (users.length) return ResponseData.error('部门被用户关联，无法删除')

        const usersInSubDepts = await this.deptService.findUsersInSubDeptsByDeptId(id)
        if (usersInSubDepts.length) return ResponseData.error('存在子级部门被用户关联，无法删除')

        const { affected } = await this.deptService.deleteDept(id)
        if (affected < 1) {
            return ResponseData.error(`删除失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '删除成功')
    }

    @Post('update')
    @Permission('system:dept:update')
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
    @Permission('system:dept:list')
    @ApiOperation({ summary: '查询部门列表' })
    async list (@Query() dto: FindDeptListDto) {
        const res = await this.deptService.findDeptList(dto)
        return ResponseData.success(res, '查询成功')
    }
}