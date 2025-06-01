/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-01 21:44:04
 * @FilePath: /lx_ytb/app/middleware/error_handler.js
 * @description:
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;

      const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message;

      if (err.errors) {
        ctx.body = { error: err.errors, status, success: false };
      } else {
        ctx.body = { error, status, success: false };
      }

      if (status !== 500 && !err.errors) {
        ctx.status = 200;
      } else {
        ctx.status = status;
      }
    }

  };
};
