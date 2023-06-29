import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3030', // Địa chỉ ứng dụng NestJS
      changeOrigin: true,
    })
  );
};