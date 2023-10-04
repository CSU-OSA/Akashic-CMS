'use strict';

/**
 * A set of functions called "actions" for `upload`
 */

module.exports = {
  async upload(ctx){
    ctx.query = { ...ctx.query }
    const {data} = await super.upload(ctx);
    return {data};
  }
};
