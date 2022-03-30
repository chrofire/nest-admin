import { Like } from 'typeorm'

/**
 * 生成find模糊查询对象
 * @param params 参数对象
 * @returns 模糊查询对象
 */
export function genVagueSearchObj (params) {
    const vagueSearchObj = {}
    Object.keys(params).forEach((key) => {
        vagueSearchObj[key] = Like(`%${params[key]}%`)
    })
    return vagueSearchObj
}

interface IPageOptions {
    pageNum: number,
    pageSize: number
}

/**
 * 生成find分页查询对象
 * @param pageOptions 分页参数对象
 * @returns find分页查询对象
 */
export function genPageOptionsObj (pageOptions: IPageOptions) {
    const { pageNum, pageSize } = pageOptions
    return {
        skip: pageSize * (pageNum - 1),
        take: pageSize
    }
}