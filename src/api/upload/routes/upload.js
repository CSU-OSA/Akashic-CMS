import {factories} from "@strapi/strapi";

export default factories.createCoreRouter('api::upload.upload',{
  routes: [
    {
      method: '',
      path: '/upload',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
});
