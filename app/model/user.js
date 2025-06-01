/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-01 21:11:07
 * @FilePath: /lx_ytb/app/model/user.js
 * @description: 
 */
/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-05-30 00:34:14
 * @FilePath: /lx_ytb/app/model/user.js
 * @description:
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
    phone: {
      type: String, required: true,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('User', UserSchema);
};
