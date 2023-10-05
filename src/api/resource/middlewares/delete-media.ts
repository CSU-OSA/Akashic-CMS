/**
 * `delete-media` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const [,,, resourceId] = ctx.request.url.split('/');
    const resource = await strapi.entityService.findOne('api::resource.resource', resourceId, {
      populate: 'media'
    });

    try {
      if (!resource) {
        ctx.throw(404, 'Resource not found');
      }
      if (!resource.media) {
        ctx.throw(404, 'Media of resource not found');
      }
      await strapi.entityService.delete('plugin::upload.file', resource.media.id);
    } catch (error) {
      ctx.throw(500, 'media delete error', error);
    }
    await next();
  };
};
