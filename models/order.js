import mongoose from 'mongoose';
import User from './user';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: { type: String, requiredPaths: true },
        quantity: { type: Number, requiredPaths: true },
        image: { type: String, requiredPaths: true },
        price: { type: Number, requiredPaths: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, requiredPaths: true },
      address: { type: String, requiredPaths: true },
      city: { type: String, requiredPaths: true },
      postalCode: { type: String, requiredPaths: true },
      country: { type: String, requiredPaths: true },
    },
    paymentMethod: { type: String, requiredPaths: true },
    paymentResult:{id:String,status:String,email_address:String },
    itemsPrice:{ type: Number, requiredPaths: true },
    shippingPrice:{ type: Number, requiredPaths: true },
    totalPrice:{ type: Number, requiredPaths: true },
    isPaid:{ type: Boolean, requiredPaths: true ,default:false},
    isDelivered:{ type: Boolean, requiredPaths: true ,default:false},
    paidAt:{type:Date},
    deliveredAt:{type:Date},

  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
