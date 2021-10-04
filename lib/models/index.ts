import { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize';

import { ApplicationConfig } from '../config';
import registerActionStarsModel from './actionStars';

export default (application: FastifyInstance, config: ApplicationConfig) => {
    const sequelizeInstance = new Sequelize(config.database.schema, config.database.username, config.database.password, {
        host: config.database.host,
        dialect: 'mysql',
        logging: message => application.log.info({ source: 'Sequelize' }, message),
    });
    registerActionStarsModel(sequelizeInstance);
};