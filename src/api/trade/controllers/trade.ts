/**
 * A set of functions called "actions" for `trade`
 */

export default {
  buy: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};
