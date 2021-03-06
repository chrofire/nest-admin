import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { MaxLength, MinLength, IsString, IsNotEmpty, IsIn, IsInt, IsOptional, IsNumber, IsArray } from 'class-validator'
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto'

export class AddRoleDto {
    @ApiProperty({ description: '角色名称' })
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    public name: string

    @ApiProperty({ description: '状态' })
    @IsIn([0, 1])
    @IsInt()
    public state: number

    @ApiProperty({ description: '备注', required: false, default: null })
    @IsString()
    @IsOptional()
    public remark?: string

    @ApiProperty({ description: '菜单id列表', type: [Number], default: [] })
    @IsNumber({}, { each: true })
    @IsArray()
    public menuIdList?: number[]
}

export class DeleteRoleDto {
    @ApiProperty({ description: 'id' })
    @IsInt()
    @IsNotEmpty()
    public id: number
}

export class UpdateRoleDto extends IntersectionType(DeleteRoleDto, AddRoleDto) {}

export class FindRoleListDto {
    @ApiProperty({ description: '角色名称', required: false })
    @IsString()
    @IsOptional()
    public name?: string
    @ApiProperty({ description: '状态', required: false })
    @IsOptional()
    public state?: number
}

export class FindRolePageListDto extends IntersectionType(FindRoleListDto, PageOptionsDto) {}