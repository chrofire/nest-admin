import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import useConfig from 'config'
import { TransformInterceptor } from './interceptors/transform.interceptor'

const config = useConfig()

async function bootstrap () {
    const app = await NestFactory.create(AppModule)

    // swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('nest-admin')
        .setDescription('nest-admin接口')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const swaggerOptions: SwaggerDocumentOptions = {}
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions)
    SwaggerModule.setup('swagger', app, swaggerDocument)

    // 全局响应拦截器
    app.useGlobalInterceptors(new TransformInterceptor())

    await app.listen(config.port)

    Logger.log(`App running at: http://localhost:${config.port}`, 'NestApplication')
    Logger.log(`Swagger: http://localhost:${config.port}/swagger`, 'Swagger')
}
bootstrap()
