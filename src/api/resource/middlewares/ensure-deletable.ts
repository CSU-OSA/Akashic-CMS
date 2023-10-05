import { Strapi } from '@strapi/strapi';
import { isAdmin } from '../../../utils/is-admin';
import { isOwner } from '../../../utils/is-owner';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {

    const [,,, resourceId] = ctx.request.url.split('/');

    if (!resourceId) {
      ctx.throw(400, 'Missing resourceId');
    }

    const resource = await strapi.entityService.findOne('api::resource.resource', resourceId, {
      populate: 'media'
    });

    if (!resource) {
      ctx.throw(404, 'Resource not found');
    }

    if (!isAdmin(ctx) && !isOwner(ctx, resource)) {
      ctx.throw(403, 'Forbidden');
    }

    await next();
  };
};
