import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import config, { isDev } from 'config'

@Module({
    imports: [
        // 全局配置模块
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
            envFilePath: [isDev() ? '.env.development' : '.env.production', '.env']
        }),
        // TypeOrm模块
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get('database')
        })
    ],
    exports: [],
    providers: []
})
export class CommonModule {}