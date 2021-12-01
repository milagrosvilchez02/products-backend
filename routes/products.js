const { Router } = require("express");
const router = Router();
const uuid4 = require("uuid4");

const products = require("../sample.json");

// /api/products
router.get("/", (req, res) => {
  res.json(products);
});

router.post("/", (req, res) => {
  const { name, description, image_url, price } = req.body;
  if (name && description && image_url && price) {
    const id = uuid4();
    const newProduct = { id, ...req.body };
    products.push(newProduct);
    res.json(products);
  } else {
    res.status(500).json({ error: "One field is missing" });
  }
});

router.put("/:id", (req, res) => {
  const editedProduct = req.body;
  let found = false;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == req.params.id) {
      products[i] = editedProduct;
      found = true;
    }
  }
  !found
    ? res.status(404).json({ error: "ID not found." })
    : res.json(products);
});

router.delete("/:id", (req, res) => {
  const index = products.findIndex((product) => product.id == req.params.id);

  if (index === -1) return res.status(404).json({ error: " ID not found" });
  products.splice(index, 1);

  res.json(products);
});

module.exports = router;
