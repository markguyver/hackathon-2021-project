'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('action_stars', [{
			name: 'Arnold Schwarzenneger',
			dob: '1947-07-30',
		},{
			name: 'Bruce Willis',
			dob: '1955-03-19',
		},{
			name: 'Jean-Claude Van Damme',
			dob: '1960-10-18',
		},{
			name: 'Chuck Norris',
			dob: '1940-03-10',
		},{
			name: 'Charles Bronson',
			dob: '1921-11-03',
		},{
			name: 'Steven Seagal',
			dob: '1952-04-10',
		},{
			name: 'Dolph Lundgren',
			dob: '1957-11-03',
		},{
			name: 'Vin Diesel',
			dob: '1967-07-18',
		},{
			name: 'Sylvester Stallone',
			dob: '1946-07-06',
		},{
			name: 'Lee Marvin',
			dob: '1924-02-19',
		},{
			name: 'Bruce Lee',
			dob: '1940-11-27',
		},{
			name: 'Clint Eastwood',
			dob: '1930-05-31',
		},{
			name: 'Sonny Chiba',
			dob: '1939-01-22',
		},{
			name: 'Jackie Chan',
			dob: '1954-04-07',
		},{
			name: 'Wesley Snipes',
			dob: '1962-07-31',
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('action_stars', null, {});
	}
};
