import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { Min, IsInt } from 'class-validator'

export class PageOptionsDto {
    @ApiProperty({
        description: '当前页数',
        required: false,
        default: 1
    })
    @Min(1, { message: '当前页数至少为1' })
    @IsInt({ message: '当前页数必须为整数' })
    @Type(() => Number)
    public pageNum = 1

    @ApiProperty({
        description: '当前页记录数量',
        required: false,
        default: 10
    })
    @Min(1, { message: '当前页记录数量至少为1' })
    @IsInt({ message: '当前页记录数量必须为整数' })
    @Type(() => Number)
    public pageSize = 10
}