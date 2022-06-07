import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
};

export default registerAs('orm', () => options);
