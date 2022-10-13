module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const subsribeSchema = new Schema({
    user: { type: mongoose.ObjectId, required: true, ref: 'User' }, // 当前用户id
    channel: { type: mongoose.ObjectId, required: true, ref: 'User' }, // 被订阅的用户id
  }, {
    timestamps: true,
  });

  return mongoose.model('Subscript', subsribeSchema);
};
