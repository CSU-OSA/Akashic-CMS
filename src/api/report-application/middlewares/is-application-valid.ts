import { Strapi } from '@strapi/strapi';
import { isAuthenticated } from '../../../utils/is-authenticated';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {

    if (!isAuthenticated(ctx)) {
      ctx.throw(401, 'Unauthorized');
    }

    const { resourceId } = ctx.request.body;

    if (!resourceId) {
      ctx.throw(400, 'Missing resourceId');
    }

    const resource = await strapi.entityService.findOne('api::resource.resource', resourceId);

    if (!resource) {
      ctx.throw(404, 'Resource not found');
    }

    await next();

    const { id: applicationId } = ctx.response.body.data;

    await strapi.entityService.update('api::report-application.report-application', applicationId, {
      data: {
        resource: {
          connect: [{ id: resourceId }]
        }
      }
    });
  };
};
