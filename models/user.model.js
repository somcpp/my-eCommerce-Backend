import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    role: {type: String,default: 'user'},
    addresses: {type: [Schema.Types.Mixed]},
    name: {type: String},
    orders: {type: [Schema.Types.Mixed]}
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const User = mongoose.model('User',userSchema);