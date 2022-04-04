import * as bcrypt from 'bcryptjs'

export class Bcrypt {
    /**
     * 加密
     * @param {string} encryptStr 加密的字符串
     */
    static encrypt (encryptStr) {
        const salt = bcrypt.genSaltSync(10)
        // 对明文加密
        return bcrypt.hashSync(encryptStr, salt)
    }
    /**
     * 解密
     * @param {string} decryptStr 解密的字符串
     * @param {string} compareStr 解密对比的字符串
     */
    static decrypt (decryptStr, compareStr) {
        return bcrypt.compareSync(decryptStr, compareStr)
    }
}