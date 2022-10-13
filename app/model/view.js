module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const viewSchema = new Schema({
    user: { type: mongoose.ObjectId, required: true, ref: 'User' },
    video: { type: mongoose.ObjectId, required: true, ref: 'Video' },
  }, {
    timestamps: true,
  });

  return mongoose.model('View', viewSchema);
};
