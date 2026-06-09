const mongoose = require("mongoose");
const { Schema } = mongoose;

const variantSchema = new Schema({
  sku: { 
    type: String, 
    required: true, 
    unique: true 
  },
  price_adjustment: { 
    type: Number, 
    default: 0 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0,
    default: 0 
  },
  weight: { type: String },
  shaft_type: { type: String },
  tip_size: { type: String },
  color: { type: String },
  size: { type: String },
  type: { type: String } 
}, { _id: false }); 

const productSchema = new Schema(
  {
    product_id: { 
      type: String, 
      required: true, 
      unique: true 
    },
    category_id: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true 
    },
    brand: { 
      type: String, 
      required: true 
    },
    base_price: { 
      type: Number, 
      required: true,
      min: 0 
    },
    discount_price: { 
      type: Number, 
      default: null,
      min: 0 
    },
    thumbnail: { 
      type: String, 
      required: true 
    },
    images: { 
      type: [String], 
      default: [] 
    },
    specifications: { 
      type: Schema.Types.Mixed, 
      default: {} 
    },
    
    variants: [variantSchema],
    ratings_average: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5 
    },
    status: { 
      type: String, 
      enum: ["active", "inactive", "out_of_stock"], 
      default: "active" 
    }
  },
  {
    timestamps: true, 
  }
);
productSchema.index({ name: "text", brand: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;