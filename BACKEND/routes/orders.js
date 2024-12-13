const router = require("express").Router();
let Order = require("../models/Order");

router.route("/create").post((req, res) => {
    const item_name = req.body.item_name;
    const item_code = req.body.item_code;  // Added new field
    const count = Number(req.body.count);
    const price = req.body.price;
    const contact = req.body.contact;
    const address = req.body.address;

    const newOrder = new Order({
        item_name,
        item_code,  // Added new field
        count,
        price,
        contact,
        address
    });

    newOrder.save().then(() => {
        res.json("Order Added");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: err.message});
    });
});

router.route("/").get((req, res) => {
    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
    let orderId = req.params.id;
    const { item_name, item_code, count, price, contact, address } = req.body;

    const updateOrder = {
        item_name,
        item_code,  // Added new field
        count,
        price,
        contact,
        address
    };

    await Order.findByIdAndUpdate(orderId, updateOrder)
        .then(() => {
            res.status(200).send({ status: "Order updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId)
        .then(() => {
            res.status(200).send({ status: "Order deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete order", error: err.message });
        });
});

// Get details of one order
router.route("/get/:contact").get(async(req, res) => {
    let contact = req.params.contact;
    
    await Order.findOne({ contact: contact })
        .then(order => {
            if (!order) {
                return res.status(404).send({ status: "Order not found" });
            }
            res.status(200).send({ status: "Order fetched", order });
        })
        .catch(err => res.status(500).send({ status: "Error with getting order", error: err.message }));
});

module.exports = router;
