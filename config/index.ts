import devConfig from './development.config'
import prodConfig from './production.config'

export const envConfig = {
    development: devConfig,
    production: prodConfig
}

export function isDev (): boolean {
    return process.env.NODE_ENV === 'development'
}

export default () => envConfig[process.env.NODE_ENV || 'development']()