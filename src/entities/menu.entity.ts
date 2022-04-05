import * as dayjs from 'dayjs'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_menu')
export class Menu {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ name: 'parent_id', comment: '父级id', nullable: true })
    public parentId?: number

    @Column({ comment: '菜单名称', length: 20 })
    public name: string

    @Column({ comment: '路由路径', length: 255, nullable: true })
    public path?: string

    @Column({ comment: '组件', length: 255, nullable: true })
    public componentName?: string

    @Column({ comment: '权限标识', length: 255, nullable: true })
    public permission?: string

    @Column({ comment: '图标', length: 255, nullable: true })
    public icon?: string

    @Column({ comment: '菜单类型 (0:目录 1:菜单 2:接口)' })
    public type: number

    @Column({ comment: '状态 (0:启用 1:停用)' })
    public state: number

    @Column({ comment: '是否缓存', nullable: true })
    public isCache?: boolean

    @Column({ comment: '是否外链', nullable: true })
    public isExternalLink?: boolean

    @Column({ comment: '是否显示', nullable: true })
    public isShow?: boolean

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
