module.exports = mustLogin => {
  return async function auth(ctx, next) {


    const token = ctx.get('Authorization') || null;

    if (!token && mustLogin) ctx.throw(400, '请携带token');
    try {
      if (token) {
        const tokenIsLive = await ctx.app.redis.get(token);
        if (!tokenIsLive) this.ctx.throw();
        const { userId } = await ctx.service.user.verify(token);

        const { username, email, subscribeCount } = await ctx.service.user.findById(userId);

        ctx.userInfo = {
          username, email, userId, subscribeCount,
        };
      }
    } catch (error) {
      ctx.throw(401, '登陆token已失效');
    }

    await next();
  };
};

