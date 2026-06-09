import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req?.files?.image1 && req.files.image1[0];
    const image2 = req?.files?.image2 && req.files.image2[0];
    const image3 = req?.files?.image3 && req.files.image3[0];
    const image4 = req?.files?.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        const uploadResponse = await cloudinary.uploader.upload(image.path, {
          folder: "e-commerce-mern-with-payment/products",
        });
        return uploadResponse.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      images: imagesUrl,
      date: Date.now(),
    };

    await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log("Error in addProduct controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error in listProducts controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log("Error in removeProduct controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Error in singleProduct controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { addProduct, listProducts, singleProduct, removeProduct };
