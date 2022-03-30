import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
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

    @ApiProperty({ description: '状态' })
    @IsIn([0, 1])
    @IsInt()
    public state: number

    @ApiProperty({ description: '排序', required: false, default: null })
    @IsInt()
    @IsOptional()
    public order?: number

    @ApiProperty({ description: '备注', required: false, default: null })
    @IsString()
    @IsOptional()
    public remark?: string
}

export class DeleteDeptDto {
    @ApiProperty({ description: 'id' })
    @IsInt()
    @IsNotEmpty()
    public id: number
}

export class UpdateDeptDto extends AddDeptDto {
    @ApiProperty({ description: 'id' })
    @IsInt()
    @IsNotEmpty()
    public id: number
}

export class FindDeptListDto {
    @ApiProperty({ description: '部门名称', required: false })
    @IsString()
    @IsOptional()
    public name?: string
    @ApiProperty({ description: '状态', required: false })
    @IsIn([0, 1])
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    public state?: number
}