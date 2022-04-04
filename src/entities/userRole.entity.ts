import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_user_role')
export class UserRole {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ name: 'user_id', comment: '用户id' })
    public userId: number

    @Column({ name: 'role_id', comment: '角色id' })
    public roleId: number
}
