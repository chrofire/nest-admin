import {
    Injectable,
    ValidationPipe,
    ValidationError,
    ArgumentMetadata,
    HttpException,
    HttpStatus
} from '@nestjs/common'

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    async transform (value: any, metadata: ArgumentMetadata) {
        try {
            const result = await super.transform(value, metadata)
            return result
        } catch (error) {
            throw error
        }
    }
    createExceptionFactory () {
        return (errors: ValidationError[] = []) => {
            // 获取第一个错误信息
            const message = Object.values(errors[0].constraints).shift()
            // 返回要抛出的异常, 可通过 filter 拦截该错误
            return new HttpException(
                { success: false, message, error: 'DTO Valid Error', data: null },
                HttpStatus.OK
            )
        }
    }
}
