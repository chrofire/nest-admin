import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_role_menu')
export class RoleMenu {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ name: 'role_id', comment: '角色id' })
    public roleId: number

    @Column({ name: 'menu_id', comment: '菜单id' })
    public menuId: number
}
