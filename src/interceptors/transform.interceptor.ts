import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
    Logger
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseData } from 'src/utils/responseData'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        response.status(HttpStatus.OK)
        return next.handle().pipe(
            map((data) => {
                let result
                if (
                    typeof data === `object`
                    && data.hasOwnProperty(`success`)
                    && data.hasOwnProperty(`message`)
                    && data.hasOwnProperty(`data`)
                ) {
                    result = data
                } else {
                    result = ResponseData.success(data)
                }

                Logger.log(JSON.stringify(result))
                return result
            })
        )
    }
}
