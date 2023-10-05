/**
 * `ensure-modifiable` middleware
 */

import { Strapi } from '@strapi/strapi';
import { isAdmin } from '../../../utils/is-admin';
import { isOwner } from '../../../utils/is-owner';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {

    if (ctx.request.method === 'POST') {
      return await next();
    }

    if (isAdmin(ctx)) {
      return await next();
    }

    const [,,, applicationId] = ctx.request.url.split('/');

    const application = await strapi.entityService.findOne('report-application', applicationId, { populate: 'owners' });

    if (!isOwner(ctx, application)) {
      ctx.throw(403, 'Forbidden');
    }

    return await next();
  };
};
