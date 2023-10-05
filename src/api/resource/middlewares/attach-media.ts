import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    await next();

    const { id: resourceId } = ctx.response.body.data;
    const resource = await strapi.entityService.findOne('api::resource.resource', resourceId, {
      populate: 'media'
    });
    ctx.response.body.data.mediaUrl = resource.media.url;
  };
};
