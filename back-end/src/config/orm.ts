import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from "path";

const options: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'data/nestjs.db',
    logging: true,
    entities:[path.resolve(__dirname, '..', 'database', 'models', '*')],
    migrations:[path.resolve(__dirname, '..', 'database', 'migrations', '*')],
}

module.exports = options