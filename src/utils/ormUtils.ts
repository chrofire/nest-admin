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
