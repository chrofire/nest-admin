import { Module } from '@nestjs/common'
import { CommonModule } from './modules/common.module'

@Module({
    imports: [CommonModule],
    controllers: [],
    providers: []
})
export class AppModule {}
