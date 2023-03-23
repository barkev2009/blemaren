'use strict';

const { DataTypes } = require('sequelize');
const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'courses',
      'uuid',
      {
        type: DataTypes.UUID, 
        allowNull: false, 
        unique: true,
        defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('courses', 'uuid')
  }
};
