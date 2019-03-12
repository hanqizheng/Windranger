'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Request = app.model.define('requests', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    requestId: STRING(10),
    url: STRING(300),
    method: STRING(5),
    created_at: DATE,
    updated_at: DATE,
  });

  return Request;
};
