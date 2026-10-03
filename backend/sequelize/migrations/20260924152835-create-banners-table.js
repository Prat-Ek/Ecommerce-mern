'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("banners",{
      _id:{
        type: Sequelize.UUID,
        unique:true,
        primaryKey:true,
        allowNull:false,
        defaultValue: Sequelize.UUIDV4
      },
      title:{
        type:Sequelize.STRING,
        allowNull:false
      },
      subTitle:{
        type:Sequelize.STRING,
        allowNull:true,  //optional
      },
      links:{
        type:Sequelize.JSON,
        allowNull:true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "inactive"
      },
      image: {
        type: Sequelize.JSON, 
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable("banners")
  }
};
