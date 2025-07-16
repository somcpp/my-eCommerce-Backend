import { Product } from '../models/Products.model.js';

export async function createProduct(req, res) {
    const product = new Product(req.body);
    try {
        const doc = await product.save();
        console.log("Product saved successfully:", doc);

        res.status(201).json(doc);
    } catch (err) {
        console.error("Error saving product:", err);

        // Return a readable error response to client
        res.status(400).json(err);
    }
}

export async function fetchAllProducts(req, res) {
  try {
    // console.log("Query received:", req.query);

    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.brand) filter.brand = req.query.brand;

    let query = Product.find(filter);

    if (req.query._sort && req.query._order) {
      const order = req.query._order === 'desc' ? -1 : 1;
      query = query.sort({ [req.query._sort]: order });
    }

    const products = await query;
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function fetchProductById(req,res) {
  const {id} = req.params;
  try{
    const product = await Product.findById(id);
    res.status(200).json(product);
  }catch(err) {
    res.status(400).json(err);
  }
}

export async function updateProduct(req,res) {
  const {id} = req.params;
  console.log(req.body);
  try{
    const product = await Product.findByIdAndUpdate(id,req.body,{new: true});
    res.status(200).json(product);
  } catch(err) {
    res.status(400).json(err);
  }
}