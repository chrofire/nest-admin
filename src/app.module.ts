import { Module } from '@nestjs/common'
import { CommonModule } from './modules/common.module'
import { SystemModule } from './modules/system/system.module'

@Module({
    imports: [CommonModule, SystemModule],
    controllers: [],
    providers: []
})
export class AppModule {}
