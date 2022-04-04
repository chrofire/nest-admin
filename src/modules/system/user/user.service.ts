import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Bcrypt } from 'src/utils/bcrypt'
import { genPageOptionsObj, genVagueSearchObj } from 'src/utils/ormUtils'
import { ResponseData } from 'src/utils/responseData'
import { Repository } from 'typeorm'
import { AddUserDto, FindUserListDto, FindUserPageListDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    // 添加用户
    async addUser (dto: AddUserDto) {
        try {
            // 密码加密
            dto.password = Bcrypt.encrypt(dto.password)
            
            const res = await this.userRepository.save(dto)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 删除用户
    async deleteUser (id: number) {
        try {
            const res = await this.userRepository.delete(id)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 更新用户
    async updateUser (dto: UpdateUserDto) {
        try {
            const { id } = dto
            const res = await this.userRepository.update(id, dto)
            return res
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 查询用户列表
    async findUserList (dto: FindUserListDto) {
        try {
            const vagueSearchObj = genVagueSearchObj(dto)
            const [list, total] = await this.userRepository.findAndCount({
                where: vagueSearchObj
            })
            return {
                list,
                total
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 分页查询用户列表
    async findUserPageList (dto: FindUserPageListDto) {
        try {
            const { pageNum, pageSize, ...args } = dto
            const vagueSearchObj = genVagueSearchObj(args)
            const pageOptions = genPageOptionsObj({ pageNum, pageSize })
            const [list, total] = await this.userRepository.findAndCount({
                where: vagueSearchObj,
                ...pageOptions
            })

            return {
                list,
                pageNum,
                pageSize,
                total
            }
        } catch (err) {
            ResponseData.error(err.message)
        }
    }

    // 根据用户名查找用户
    async findUserByUsername (username: string) {
        const user = await this.userRepository.createQueryBuilder('user')
            .where({ username })
            .addSelect(['user.password'])
            .getOne()
        return user
    }
}
