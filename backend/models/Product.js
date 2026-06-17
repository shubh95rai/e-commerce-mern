import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        url: {
          type: String,
          required: true,
        }, // cloudinary url of the image (used for displaying the image)
        public_id: {
          type: String,
          required: true,
        }, // cloudinary public_id of the image (used for deleting the image from cloudinary)
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    bestseller: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
