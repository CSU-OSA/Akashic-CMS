'use strict';

/**
 * resource router
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreRouter('api::resource.resource', {
  config: {
    create: {
      policies: ['api::resource.has-media'],
    },
    update: {
      middlewares: ['api::resource.ensure-modifiable']
    },
    findOne: {
      middlewares: ['api::resource.attach-media']
    },
    delete: {
      middlewares: ['api::resource.ensure-deletable', 'api::resource.delete-media']
    }
  }
});
