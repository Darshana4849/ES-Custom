const router = require("express").Router();
let InventoryItem = require("../models/inventory");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

// Create Inventory Item with Image Upload
router.post("/create", upload.single("image"), async (req, res) => {
  const { itemCode, itemName, price, quantity } = req.body;
  const imageUrl = req.file ? req.file.filename : null;

  // Ensure imageUrl is not null if required
  if (!imageUrl) {
    return res.status(400).json("Error: Image is required.");
  }

  try {
    // Check if an item with the same itemCode already exists
    const existingItem = await InventoryItem.findOne({ itemCode });
    if (existingItem) {
      return res.status(400).json("Error: Item code already exists.");
    }

    const newInventoryItem = new InventoryItem({
      itemCode,
      itemName, // Item name can be duplicate
      price,
      quantity,
      imageUrl,
    });

    await newInventoryItem.save();
    res.json("Inventory item added!");
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});

// Rest of the routes remain unchanged...


// Read Inventory Items
router.route("/").get((req, res) => {
  InventoryItem.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update Inventory Item
router.put("/update/:id", upload.single("image"), async (req, res) => {
  let itemId = req.params.id;
  const { itemCode, itemName, price, quantity } = req.body;
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;

  const updateInventoryItem = {
    itemCode,
    itemName,
    price,
    quantity,
    imageUrl
  };

  await InventoryItem.findByIdAndUpdate(itemId, updateInventoryItem)
    .then(() => res.status(200).send({ status: "Inventory item updated" }))
    .catch((err) => res.status(500).send({ status: "Error with updating data", error: err.message }));
});

// Delete Inventory Item
router.delete("/delete/:id", async (req, res) => {
  let itemId = req.params.id;

  await InventoryItem.findByIdAndDelete(itemId)
    .then(() => res.status(200).send({ status: "Inventory item deleted" }))
    .catch((err) => res.status(500).send({ status: "Error with deleting item", error: err.message }));
});

// Get Details of One Inventory Item
router.route("/get/:itemCode").get(async(req, res) => {
  let itemCode = req.params.itemCode;
  
  await InventoryItem.findOne({ itemCode: itemCode })
      .then(inventoryItem => {
          if (!inventoryItem) {
              return res.status(404).send({ status: "inventory not found" });
          }
          res.status(200).send({ status: "inventory fetched", inventoryItem });
      })
      .catch(err => res.status(500).send({ status: "Error with getting inventory", error: err.message }));
});


module.exports = router;