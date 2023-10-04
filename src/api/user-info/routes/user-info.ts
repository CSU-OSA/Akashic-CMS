export default {
  routes: [
    {
     method: 'GET',
     path: '/user-info/me',
     handler: 'user-info.me',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/user-info/update',
      handler: 'user-info.update',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
