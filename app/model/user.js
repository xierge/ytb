module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: null }, // 头像
    cover: { type: String, default: null }, // 封面
    channelDescription: { type: String, default: null }, // 频道介绍
    subscribeCount: { type: Number, default: 0 }, // 被订阅次数
  }, {
    timestamps: true,
  });

  return mongoose.model('User', UserSchema);
};
