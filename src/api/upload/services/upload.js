'use strict';
import {factories} from "@strapi/strapi";
/**
 * upload service
 */

export default factories.createCoreService('api::upload.upload',({ strapi })=> ({
  // async upload(...args){
  //   let response = {okay: true};
  //
  //   if(response.okay === false)
  //     return{response,error: true}
  //   return response;
  // }
  async upload(...args){
    const {result} = await super.create(...args);

    return {result}
  }
  })
)
