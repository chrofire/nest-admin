import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsOptional,
    IsInt,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsIn,
    IsArray,
    IsNumber
} from 'class-validator'
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto'

export class AddUserDto {
    @ApiProperty({ description: '用户名' })
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    public username: string

    @ApiProperty({ description: '密码' })
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    public password: string

    @ApiProperty({ description: '昵称' })
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    public nickname: string

    @ApiProperty({ description: '邮箱' })
    @MaxLength(255)
    @MinLength(3)
    @IsString()
    @IsOptional()
    public email?: string

    @ApiProperty({ description: '手机号' })
    @MaxLength(11)
    @MinLength(11)
    @IsString()
    @IsOptional()
    public phone?: string

    @ApiProperty({ description: '部门id', required: false, default: null })
    @IsInt()
    @IsOptional()
    public deptId?: number

    @ApiProperty({ description: '状态' })
    @IsIn([0, 1])
    @IsInt()
    public state: number

    @ApiProperty({ description: '备注', required: false, default: null })
    @IsString()
    @IsOptional()
    public remark?: string

    @ApiProperty({ description: '角色id列表', type: [Number], default: [] })
    @IsNumber({}, { each: true })
    @IsArray()
    public roleIdList?: number[]
}

export class DeleteUserDto {
    @ApiProperty({ description: 'id' })
    @IsInt()
    @IsNotEmpty()
    public id: number
}

export class UpdateUserDto extends IntersectionType(
    DeleteUserDto,
    OmitType(AddUserDto, ['password'] as const)
) {}

export class FindUserListDto {
    @ApiProperty({ description: '用户名', required: false })
    @IsOptional()
    public username?: string
    @ApiProperty({ description: '昵称', required: false })
    @IsOptional()
    public nickname?: number
    @ApiProperty({ description: '部门id', required: false })
    @Type(() => Number)
    @IsOptional()
    public deptId?: number
}

export class FindUserPageListDto extends IntersectionType(FindUserListDto, PageOptionsDto) {}