import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsInt, IsNotEmpty, IsString, MinLength, MaxLength, IsIn } from 'class-validator'

export class AddDeptDto {
    @ApiProperty({ description: '父级id', required: false, default: null })
    @IsInt()
    @IsOptional()
    public parentId?: number

    @ApiProperty({ description: '部门名称' })
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    public name: string

    @ApiProperty({ description: '状态', required: false, default: 0 })
    @IsIn([0, 1])
    @IsInt()
    @IsOptional()
    public state?: number

    @ApiProperty({ description: '排序', required: false, default: null })
    @IsInt()
    @IsOptional()
    public order?: number

    @ApiProperty({ description: '备注', required: false, default: null })
    @IsString()
    @IsOptional()
    public remark?: string
}