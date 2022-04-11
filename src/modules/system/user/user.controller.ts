import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { OpenAuth } from 'src/decorators/openAuth.decorator'
import { ResponseData } from 'src/utils/responseData'
import { AddUserDto, DeleteUserDto, FindUserListDto, FindUserPageListDto, LoginDto, UpdateUserDto, UpdateUserPasswordDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('用户')
@ApiBearerAuth()
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Post('login')
    @ApiOperation({ summary: '登录' })
    @OpenAuth()
    async login (@Body() dto: LoginDto) {
        const res = await this.userService.loginUser(dto)
        return ResponseData.success(res, '登录成功')
    }

    @Post('add')
    @ApiOperation({ summary: '添加用户' })
    async add (@Body() dto: AddUserDto) {
        const { username } = dto

        const user = await this.userService.findUserByUsername(username)
        if (user) return ResponseData.error('已存在该用户')

        await this.userService.addUser(dto)
        return ResponseData.success(null, '添加成功')
    }

    @Post('delete')
    @ApiOperation({ summary: '删除用户' })
    async delete (@Body() dto: DeleteUserDto) {
        const { id } = dto
        const { affected } = await this.userService.deleteUser(id)
        if (affected < 1) {
            return ResponseData.error(`删除失败，未找到id为${id}的记录`)
        }
        return ResponseData.success(null, '删除成功')
    }

    @Post('update')
    @ApiOperation({ summary: '更新用户' })
    async update (@Body() dto: UpdateUserDto) {
        const { id, username } = dto

        const user = await this.userService.findUserByUsername(username)
        if (user && user.id !== id) return ResponseData.error('已存在该用户名')

        await this.userService.updateUser(dto)
        return ResponseData.success(null, '更新成功')
    }

    @Get('list')
    @ApiOperation({ summary: '查询用户列表' })
    async list (@Query() dto: FindUserListDto) {
        const res = await this.userService.findUserList(dto)
        return ResponseData.success(res, '查询成功')
    }

    @Get('pageList')
    @ApiOperation({ summary: '分页查询用户列表' })
    async pageList (@Query() dto: FindUserPageListDto) {
        const res = await this.userService.findUserPageList(dto)
        return ResponseData.success(res, '查询成功')
    }

    @Get('userInfo')
    @ApiOperation({ summary: '查询当前用户信息' })
    async userInfo (@Req() req) {
        const { id } = req.user
        const res = await this.userService.findCurrentUserInfo(id)
        return ResponseData.success(res, '查询成功')
    }

    @Post('updatePassword')
    @ApiOperation({ summary: '更新当前用户密码' })
    async updatePassword (@Req() req, @Body() dto: UpdateUserPasswordDto) {
        const { id } = req.user
        await this.userService.updatePassword(id, dto)
        return ResponseData.success(null, '更新成功')
    }
}