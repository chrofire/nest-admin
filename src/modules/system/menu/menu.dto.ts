import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsOptional, IsInt, IsNotEmpty, IsString, MinLength, MaxLength, IsIn, IsBoolean } from 'class-validator'

export class AddMenuDto {
    @ApiProperty({ description: '父级id', required: false, default: null })
    @IsInt()
    @IsOptional()
    public parentId?: number

    @ApiProperty({ description: '菜单名称' })
    @MaxLength(20)
    @MinLength(1)
    @IsString()
    @IsNotEmpty()
    public name: string

    @ApiProperty({ description: '路由路径', required: false, default: null })
    @MaxLength(255)
    @IsString()
    @IsOptional()
    public path?: string

    @ApiProperty({ description: '组件', required: false, default: null })
    @MaxLength(255)
    @IsString()
    @IsOptional()
    public componentName?: string

    @ApiProperty({ description: '权限标识', required: false, default: null })
    @MaxLength(255)
    @IsString()
    @IsOptional()
    public permission?: string

    @ApiProperty({ description: '图标', required: false, default: null })
    @MaxLength(255)
    @IsString()
    @IsOptional()
    public icon?: string

    @ApiProperty({ description: '菜单类型' })
    @IsIn([0, 1, 2])
    @IsInt()
    public type: number

    @ApiProperty({ description: '状态' })
    @IsIn([0, 1])
    @IsInt()
    public state: number

    @ApiProperty({ description: '是否缓存', required: false, default: true })
    @IsBoolean()
    @IsOptional()
    public isCache?: boolean

    @ApiProperty({ description: '是否外链', required: false, default: false })
    @IsBoolean()
    @IsOptional()
    public isExternalLink?: boolean

    @ApiProperty({ description: '是否显示', required: false, default: true })
    @IsBoolean()
    @IsOptional()
    public isShow?: boolean

    @ApiProperty({ description: '排序', required: false, default: null })
    @IsInt()
    @IsOptional()
    public order?: number

    @ApiProperty({ description: '备注', required: false, default: null })
    @IsString()
    @IsOptional()
    public remark?: string
}

export class DeleteMenuDto {
    @ApiProperty({ description: 'id' })
    @IsInt()
    @IsNotEmpty()
    public id: number
}

export class UpdateMenuDto extends IntersectionType(DeleteMenuDto, AddMenuDto) {}

export class FindMenuListDto {
    @ApiProperty({ description: '菜单名称', required: false })
    @IsString()
    @IsOptional()
    public name?: string
    @ApiProperty({ description: '状态', required: false })
    @IsOptional()
    public state?: number
}