const mongoose = require("mongoose");
const { Schema } = mongoose;

const shippingAddressSchema = new Schema(
  {
    recipient_name: {
      type: String,
      required: true,
    },
    recipient_phone: {
      type: String,
      required: true,
    },
    address_string: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const orderItemSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    shaft_type: { type: String },
    weight: { type: String },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_method: {
      type: String,
      enum: ["COD", "VNPAY", "MOMO", "BANK_TRANSFER"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    order_status: {
      type: String,
      enum: ["pending", "processing", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    shipping_address: {
      type: shippingAddressSchema,
      required: true,
    },
    items: [orderItemSchema],
    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ user_id: 1, order_status: 1 });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
