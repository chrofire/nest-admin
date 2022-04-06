import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import config, { isDev } from 'config'
import { AuthGuard } from 'src/guards/auth.guard'

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
        }),
        // Jwt模块
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get('jwt').secret,
                    signOptions: { expiresIn: config.get('jwt').expiresIn }
                }
            }
        })
    ],
    exports: [JwtModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class CommonModule {}