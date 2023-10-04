/**
 * A set of functions called "actions" for `user-info`
 */

import { makeResponse } from "../../../utils/response";

export default {
  me: async (ctx, next) => {
    try {
      strapi.controller('plugin::users-permissions.user').me(ctx, next);
    } catch (err) {
      ctx.body = err;
    }
  },
  update: async (ctx, next) => {
    try {
      const { stuId, username, email } = ctx.request.body;
      await strapi.entityService.update('plugin::users-permissions.user', ctx.state.user.id, {
        data: {
          stuId,
          username,
          email
        },
        populate: "*"
      });
      makeResponse(ctx, 'success', 'update success');
    } catch (err) {
      makeResponse(ctx, 'fail', err.message);
    }
  },
};
