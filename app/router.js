'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/url', controller.home.getURL);
  router.get('/*', controller.home.index);

};
