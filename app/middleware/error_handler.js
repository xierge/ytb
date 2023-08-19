/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 09:22:23
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

      ctx.body = { error };

      if (status !== 500) {
        ctx.body.code = 1;
        ctx.status = 200;
      } else {
        ctx.status = status;
      }
    }

  };
};
