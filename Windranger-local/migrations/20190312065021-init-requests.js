'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('requests', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      requestId: STRING(10),
      url: STRING(300),
      method: STRING(5),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('requests');
  },
};
