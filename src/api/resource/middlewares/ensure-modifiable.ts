/**
 * `ensure-modifiable` middleware
 */

import { Strapi } from '@strapi/strapi';
import { ContentTypes } from '@strapi/strapi/lib/types/shared';
import { isAdmin } from '../../../utils/is-admin';
import { isOwner } from '../../../utils/is-owner';
import { isAuthenticated } from '../../../utils/is-authenticated';

type PutResourceData = Partial<ContentTypes['api::resource.resource']['attributes']>;

// allow to be modified by frontend
const MODIFIABLE_FIELDS: (keyof PutResourceData)[] = ['media', 'name', 'description', 'status', 'likeCount'];

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    if (!isAuthenticated(ctx)) {
      ctx.throw(401, 'Unauthorized');
    }

    const [,,, resourceId] = ctx.request.url.split('/');
    const { status, ...rest } = (ctx.request.body.data as PutResourceData);

    const resource = await strapi.entityService.findOne('api::resource.resource', resourceId, { populate: 'owners' });

    if (!resource) {
      ctx.throw(404, 'Resource not found');
    }

    if (!isOwner(ctx, resource)) {
      ctx.throw(403, 'Forbidden');
    }

    if (!isAdmin(ctx) && (status)) {
      ctx.throw(403, 'Forbidden', 'You are not allowed to change the status of this resource');
    }

    const data = Object.keys(rest).reduce((acc, key) => {
      if (MODIFIABLE_FIELDS.includes(key as keyof PutResourceData)) {
        acc[key] = rest[key];
      }
      return acc;
    }, {} as PutResourceData);

    ctx.request.body.data = data;

    await next();
  };
};
