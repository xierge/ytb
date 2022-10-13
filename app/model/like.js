module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const likeSchema = new Schema({
    like: { type: Number, required: true, enum: [ 1, -1 ] },
    user: { type: mongoose.ObjectId, required: true, ref: 'User' },
    video: { type: mongoose.ObjectId, required: true, ref: 'Video' },
  }, {
    timestamps: true,
  });
  return mongoose.model('Like', likeSchema);
};
