module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const commentSchema = new Schema({
    userId: { type: mongoose.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    dtime: { type: Date },
    status: { type: Number, required: true, default: 0 }, // 0 未完成 1 已完成
  }, {
    timestamps: true,
  });

  return mongoose.model('Todo', commentSchema);
};
