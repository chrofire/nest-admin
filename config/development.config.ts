export default () => ({
    port: 3000,
    database: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'nest-admin',
        username: 'root',
        password: '123456',
        timezone: '+08:00',
        // entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
        autoLoadEntities: true, // 自动导入entity文件
        synchronize: true, // 同步
        logging: false // 日志
    }
})