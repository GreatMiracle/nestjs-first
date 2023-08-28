import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: '123456@',
    database: 'improvenodejs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
      },
  };
  
  export default config;