import * as dayjs from 'dayjs'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_dept')
export class Dept {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ name: 'parent_id', comment: '父级id', nullable: true })
    public parentId?: number

    @Column({ comment: '部门名称', length: 20 })
    public name: string

    @Column({ comment: '状态 (0:启用 1:停用)', default: 0 })
    public state?: number

    @Column({ comment: '排序', nullable: true })
    public order?: number

    @Column({ comment: '备注', nullable: true })
    public remark?: string

    @Column({
        name: 'create_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        readonly: true,
        transformer: {
            to: (value) => value,
            from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        comment: '创建时间'
    })
    public createAt: Date

    @Column({
        name: 'update_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        readonly: true,
        transformer: {
            to: (value) => value,
            from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        comment: '更新时间'
    })
    public updateAt: Date
}
