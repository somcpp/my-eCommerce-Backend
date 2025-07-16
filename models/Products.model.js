import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },  // ✅ Safe
    description: { type : String},
    price: { type: Number, min:[1, 'wrong min price'], max:[10000, 'wrong max price']},
    discountPercentage: { type: Number, min:[1, 'wrong min discount'], max:[99, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max rating'], default:0},
    stock: { type: Number, min:[0, 'wrong min stock'], default:0},
    brand: { type : String},
    category: { type : String},
    thumbnail: { type : String},
    images:{ type : [String]},
    deleted: { type : Boolean, default: false},
})
const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret) {delete ret._id}
})
export const Product = mongoose.model('Product',productSchema);