import { HttpException, HttpStatus } from '@nestjs/common'

// 响应数据格式化
export class ResponseData {
    /**
     * 成功响应格式化
     * @param data 数据
     * @param message 信息
     */
    public static success (data: any, message: any = `成功`) {
        return {
            success: true,
            message,
            data: data || typeof data === `boolean` || typeof data === `number` ? data : null
        }
    }
    /**
     * 错误响应格式化
     * @param response 信息 | 数据
     * @param status 状态码
     */
    public static error (response: string | Record<string, any>, status: HttpStatus = 200) {
        throw new HttpException(response, status)
    }
}
