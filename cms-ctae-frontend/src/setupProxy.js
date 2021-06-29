const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/auth/signUp", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/auth/login", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/auth/updateProfile", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/club/event", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/club/event/create", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/club/event/update", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/club/event/delete", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/club/event/participate", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/admin/club/getClubData", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/admin/club/update", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/admin/club/getAllClubData", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/club/post/getPost", {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
};
