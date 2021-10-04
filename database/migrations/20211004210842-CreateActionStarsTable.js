'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('action_stars', {
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			dob: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable('action_stars');
	}
};
