import * as dayjs from 'dayjs'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_user')
export class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ comment: '用户名', length: 20 })
    public username: string

    @Column({ comment: '密码', length: 255, select: false })
    public password: string

    @Column({ comment: '昵称', length: 20, nullable: true })
    public nickname?: string

    @Column({ comment: '邮箱', length: 255, nullable: true })
    public email?: string

    @Column({ comment: '手机号', length: 11, nullable: true })
    public phone?: string

    @Column({ name: 'dept_id', comment: '部门id', nullable: true })
    public deptId?: number

    @Column({ comment: '状态 (0:启用 1:停用)' })
    public state: number

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