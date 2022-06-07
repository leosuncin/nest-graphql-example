import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
  autoLoadEntities: true,
};

export default registerAs('orm', () => options);
