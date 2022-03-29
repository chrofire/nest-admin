import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dept } from 'src/entities/dept.entity'
import { DeptController } from './dept.controller'
import { DeptService } from './dept.service'

@Module({
    imports: [TypeOrmModule.forFeature([Dept])],
    controllers: [DeptController],
    providers: [DeptService]
})
export class DeptModule {}