import { DataTypes, Model, Sequelize } from "sequelize";

export class ActionStar extends Model {
}

export default (sequelizeInstance: Sequelize) => {
    ActionStar.init({
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        sequelize: sequelizeInstance,
        modelName: 'ActionStar',
        tableName: 'action_stars',
    });
};