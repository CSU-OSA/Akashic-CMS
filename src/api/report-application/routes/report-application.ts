/**
 * report-application router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::report-application.report-application', {
  config: {
    find: {
      middlewares: ['api::report-application.ensure-modifiable'],
    },
    findOne: {
      middlewares: ['api::report-application.ensure-modifiable'],
    },
    create: {
      middlewares: ['api::report-application.is-application-valid'],
    },
    update: {
      middlewares: ['api::report-application.ensure-modifiable'],
    },
    delete: {
      middlewares: ['api::report-application.ensure-modifiable'],
    },
  }
});
