import { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize';
import { container } from 'tsyringe';

import registerActionStarsModel from './actionStars';

export default (application: FastifyInstance) => {
    const sequelizeInstance = new Sequelize(
        application.appConfig.database.schema,
        application.appConfig.database.username,
        application.appConfig.database.password,
        {
            host: application.appConfig.database.host,
            dialect: 'mysql',
            logging: message => application.log.info({ source: 'Sequelize' }, message),
        },
    );
    registerActionStarsModel(sequelizeInstance);
    container.register(Sequelize, { useValue: sequelizeInstance });
};