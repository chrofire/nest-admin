import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Permission } from 'src/decorators/permission.decorator'
import { ResponseData } from 'src/utils/responseData'
import { AddMenuDto, DeleteMenuDto, FindMenuListDto, UpdateMenuDto } from './menu.dto'
import { MenuService } from './menu.service'

@Controller('menu')
@ApiTags('菜单')
@ApiBearerAuth()
export class MenuController {
    constructor (private readonly menuService: MenuService) {}
    
    @Post('add')
    @Permission('system:menu:add')
    @ApiOperation({ summary: '添加菜单' })
    async add (@Body() dto: AddMenuDto) {
        const { name } = dto

        const menus = await this.menuService.findMenusByName(name)
        if (menus.length) return ResponseData.error('已存在该菜单名称')

        await this.menuService.addMenu(dto)
        return ResponseData.success(null, '添加成功')
    }

    @Post('delete')
    @Permission('system:menu:delete')
    @ApiOperation({ summary: '删除菜单' })
    async delete (@Body() dto: DeleteMenuDto) {
        const { id } = dto
        
        const menus = await this.menuService.findChildrenMenusById(id)
        if (menus.length)return ResponseData.error('菜单存在子级，无法删除')

        const { affected } = await this.menuService.deleteMenu(id)
        if (affected < 1) {
            return ResponseData.error(`删除失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '删除成功')
    }

    @Post('update')
    @Permission('system:menu:update')
    @ApiOperation({ summary: '更新菜单' })
    async update (@Body() dto: UpdateMenuDto) {
        const { id, name } = dto

        const menus = await this.menuService.findMenusByName(name)
        if (menus.filter((item) => item.id !== id).length) return ResponseData.error('已存在该菜单名称')

        const { affected } = await this.menuService.updateMenu(dto)
        if (affected < 1) {
            return ResponseData.error(`更新失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '更新成功')
    }

    @Get('list')
    @Permission('system:menu:list')
    @ApiOperation({ summary: '查询菜单列表' })
    async list (@Query() dto: FindMenuListDto) {
        const res = await this.menuService.findMenuList(dto)
        return ResponseData.success(res, '查询成功')
    }
}