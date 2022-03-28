import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config, { isDev } from 'config'

@Module({
    imports: [
        // 全局配置模块
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
            envFilePath: [isDev() ? '.env.development' : '.env.production', '.env']
        })
    ],
    exports: [],
    providers: []
})
export class CommonModule {}