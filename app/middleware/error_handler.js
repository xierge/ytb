/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-05-30 22:00:44
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
        ctx.body = { error: err.errors };
      } else {
        ctx.body = { error };
      }
      ctx.body.code = 1;

      if (status !== 500 && !err.errors) {
        ctx.status = 200;
      } else {
        ctx.status = status;
      }
    }

  };
};
