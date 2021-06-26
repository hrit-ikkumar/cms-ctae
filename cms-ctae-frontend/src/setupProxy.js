const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/auth/signUp", {
      target: "http://localhost:3002/",
      changeOrigin: true
    })
  );
  app.use(
    proxy("/auth/login", {
      target: "http://localhost:3002/",
      changeOrigin: true
    })
  );
};