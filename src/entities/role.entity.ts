import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('sys_role')
export class Role {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ comment: '角色名称', length: 20 })
    public name: string

    @Column({ comment: '状态 (0:启用 1:停用)' })
    public state: number

    @Column({ comment: '备注', nullable: true })
    public remark?: string
}
