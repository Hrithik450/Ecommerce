import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import db from "../database/firebase.js";
import createProductModel from "../model/product.js";

const ProductRef = collection(db, "products");

export const createProduct = async (req, res, next) => {
  const { formData } = req.body;
  const {
    title,
    price,
    description,
    category,
    stock,
    image,
    collection,
    colors,
    sizes,
    salePrice,
  } = formData;

  try {
    if (
      !title ||
      !price ||
      !description ||
      !category ||
      !stock ||
      !image ||
      !collection ||
      !colors ||
      !sizes ||
      !salePrice
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const reviews = Math.floor(Math.random() * 100) + 1;

    const product = {
      ...formData,
      rating: 4,
      reviews,
    };

    const productID = await createProductModel(product);
    const productRef = doc(ProductRef, productID);
    await updateDoc(productRef, {
      ...product,
      productID: productID,
    });

    res
      .status(200)
      .json({ success: true, message: "Product Registered Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const getFilteredProducts = async (req, res, next) => {
  try {
    const {
      Category = null,
      Collections = null,
      sort = null,
      page = 1,
      search = null,
    } = req.query;

    let queryConstraints = [];
    const pageSize = 8;

    if (Category) {
      queryConstraints.push(where("category", "==", Category));
    }

    if (Collections) {
      queryConstraints.push(where("collection", "==", Collections));
    }

    switch (sort) {
      case "price-lowtohigh":
        queryConstraints.push(orderBy("salePrice", "asc"));
        break;

      case "price-hightolow":
        queryConstraints.push(orderBy("salePrice", "desc"));
        break;

      case "ratings-hightolow":
        queryConstraints.push(orderBy("rating", "desc"));
        break;

      case "ratings-lowtohigh":
        queryConstraints.push(orderBy("rating", "asc"));
        break;

      default:
        queryConstraints.push(orderBy("price", "asc"));
        break;
    }

    const Query = query(ProductRef, ...queryConstraints);
    const snapShot = await getDocs(Query);

    let products = [];

    snapShot.forEach((doc) => {
      products.push({ ...doc.data() });
    });

    if (search) {
      const lowerKeyword = search.toLowerCase();
      products = products.filter((product) => {
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        return (
          title.includes(lowerKeyword) ||
          title.includes(lowerKeyword.split(" ").reverse().join(" ")) ||
          description.includes(lowerKeyword) ||
          description.includes(lowerKeyword.split(" ").reverse().join(" "))
        );
      });
    }

    const length = products && products.length;
    const startIndex = (Number(page) - 1) * pageSize;
    products = products.slice(startIndex, startIndex + pageSize);

    return res.status(200).json({
      success: true,
      products: products,
      totalProducts: length,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { productID } = req.params;
  const { updatedData } = req.body;

  try {
    if (!productID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide ProductID!!" });
    }

    const productRef = doc(ProductRef, productID);
    const Snapshot = await getDoc(productRef);
    if (!Snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    const existingData = Snapshot.data();
    const existingComments = existingData?.comments || [];

    let newComments = existingComments;
    if (updatedData.comments) {
      newComments = [...existingComments, updatedData.comments];
    }

    let updatedRating = existingData.rating || 0;
    let updatedReviews = existingData.reviews || 0;

    if (updatedData.comments?.rating) {
      const allRatings = [
        ...existingComments.map((c) => c.rating),
        updatedData.comments.rating,
      ].filter((r) => r !== undefined);

      updatedRating =
        allRatings.reduce((acc, r) => acc + r, 0) / allRatings.length;
      updatedReviews = allRatings.length;
    }

    await updateDoc(productRef, {
      ...existingData,
      ...updatedData,
      comments: newComments,
      rating: updatedRating,
      reviews: updatedReviews,
    });

    res
      .status(200)
      .json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const deleteProduct = async (req, res, next) => {
  const { productID } = req.params;

  try {
    if (!productID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide ProductID!" });
    }
    const productRef = doc(ProductRef, productID);
    await deleteDoc(productRef);

    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const getHeroProducts = async (req, res, next) => {
  try {
    const string = "Hero";
    const q = query(ProductRef, where("type", "array-contains", string));
    const Snapshot = await getDocs(q);

    const heroProducts = {};
    Snapshot.forEach((doc) => {
      const data = doc.data();
      heroProducts[data.HeroOrder] = {
        ...data,
      };
    });

    return res.status(200).json({ success: true, products: heroProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const getProductsBySection = async (req, res, next) => {
  const { sectionName } = req.body;

  try {
    const q = query(ProductRef, where("type", "array-contains", sectionName));
    const querySnapshot = await getDocs(q);

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data() });
    });

    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const getProductById = async (req, res, next) => {
  const { productID } = req.params;
  try {
    if (!productID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide ProductID" });
    }

    const ProductRef = doc(db, "products", productID);
    const Product = await getDoc(ProductRef);

    if (!Product.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not found!" });
    }

    return res.status(200).json({
      success: true,
      data: Product.data(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const randomProducts = async (req, res, next) => {
  try {
    const allProductsSnapshot = await getDocs(ProductRef);
    const allProducts = allProductsSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
    const randomProducts = shuffledProducts.slice(0, 4);

    res.status(200).json({
      success: true,
      products: randomProducts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};
