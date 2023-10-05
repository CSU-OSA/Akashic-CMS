/**
 * A set of functions called "actions" for `user-info`
 */
import { Controller } from "@strapi/strapi/lib/types/core/common";
import { ContentTypes } from "@strapi/strapi/lib/types/shared";
import { makeResponse } from "../../../utils/response";

type UpdateRequestBody = Partial<Pick<ContentTypes['plugin::users-permissions.user']['attributes'], 'stuId' | 'username' | 'email'>>;

const UserInfoController: Controller = {
  me: async (ctx, next) => {
    try {
      strapi.controller('plugin::users-permissions.user').me(ctx, next);
    } catch (err) {
      ctx.body = err;
    }
  },
  update: async (ctx) => {
    try {
      const { stuId, username, email } = ctx.request.body as UpdateRequestBody;
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

export default UserInfoController;
