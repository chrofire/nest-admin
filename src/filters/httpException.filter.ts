import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common'

interface ErrorResponse {
    success: boolean,
    message: string,
    error?: any,
    data: null
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch (exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status
            = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
        let errorResponse: ErrorResponse
        const _errorResponse = exception.getResponse()
        switch (typeof _errorResponse) {
            case 'object':
                errorResponse = {
                    success: false,
                    message: exception.message,
                    error: _errorResponse,
                    data: null
                }
                break
            default:
                errorResponse = {
                    success: false,
                    message: exception.message,
                    data: null
                }
                break
        }

        Logger.error(JSON.stringify(errorResponse))
        response.status(status).json(errorResponse)
    }
}
