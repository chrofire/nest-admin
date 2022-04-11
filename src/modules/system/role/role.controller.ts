import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Permission } from 'src/decorators/permission.decorator'
import { ResponseData } from 'src/utils/responseData'
import { AddRoleDto, DeleteRoleDto, FindRoleListDto, FindRolePageListDto, UpdateRoleDto } from './role.dto'
import { RoleService } from './role.service'

@Controller('role')
@ApiTags('角色')
@ApiBearerAuth()
export class RoleController {
    constructor (private readonly roleService: RoleService) {}

    @Post('add')
    @Permission('system:role:add')
    @ApiOperation({ summary: '添加角色' })
    async add (@Body() dto: AddRoleDto) {
        const { name } = dto

        const roles = await this.roleService.findRolesByName(name)
        if (roles.length) return ResponseData.error('已存在该角色名称')

        await this.roleService.addRole(dto)
        return ResponseData.success(null, '添加成功')
    }

    @Post('delete')
    @Permission('system:role:delete')
    @ApiOperation({ summary: '删除角色' })
    async delete (@Body() dto: DeleteRoleDto) {
        const { id } = dto
        const { affected } = await this.roleService.deleteRole(id)
        if (affected < 1) {
            return ResponseData.error(`删除失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '删除成功')
    }

    @Post('update')
    @Permission('system:role:update')
    @ApiOperation({ summary: '更新角色' })
    async update (@Body() dto: UpdateRoleDto) {
        const { id, name } = dto

        const roles = await this.roleService.findRolesByName(name)
        if (roles.filter((item) => item.id !== id).length) return ResponseData.error('已存在该角色名称')

        await this.roleService.updateRole(dto)
        return ResponseData.success(null, '更新成功')
    }

    @Get('list')
    @Permission('system:role:list')
    @ApiOperation({ summary: '查询角色列表' })
    async list (@Query() dto: FindRoleListDto) {
        const res = await this.roleService.findRoleList(dto)
        return ResponseData.success(res, '查询成功')
    }

    @Get('pageList')
    @Permission('system:role:pageList')
    @ApiOperation({ summary: '分页查询角色列表' })
    async pageList (@Query() dto: FindRolePageListDto) {
        const res = await this.roleService.findRolePageList(dto)
        return ResponseData.success(res, '查询成功')
    }
}
