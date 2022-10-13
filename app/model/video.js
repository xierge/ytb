module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VideoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    vodVideoId: { type: String, required: true },
    cover: { type: String, default: null }, // 封面
    user: { type: mongoose.ObjectId, required: true, ref: 'User' }, // 视频作者
    commentsCount: { type: Number, default: 0 }, // 评论数量
    likedCount: { type: Number, default: 0 }, // 喜欢的数量
    dislikedCount: { type: Number, default: 0 }, // 喜欢的数量
  }, {
    timestamps: true,
  });

  return mongoose.model('Video', VideoSchema);
};
