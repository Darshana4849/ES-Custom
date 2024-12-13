const router = require("express").Router();
let Suplier = require("../models/Suplier");

//Create suplier
router.route("/create").post((req, res) => {
    const itemName = req.body.itemName;
    const itemCode = req.body.itemCode;
    const itemFee = req.body.itemFee;
    const itemDescription = req.body.itemDescription;
    const availableQty = Number(req.body.availableQty);

    const newSuplier = new Suplier({
        itemName,
        itemCode,
        itemFee,
        itemDescription,
        availableQty
    });       

    newSuplier.save()
        .then(() => res.json("Suplier added!"))
        .catch(err => res.status(400).json("Error: " + err));
})


//Read suplier
router.route("/").get((req, res) => {
    Suplier.find()
        .then(supliers => res.json(supliers))
        .catch(err => res.status(400).json("Error: " + err));
});


//Update suplier
router.route("/update/:id").put(async(req, res) => {
    let suplierId = req.params.id;
    const { itemName, itemCode, itemFee, itemDescription, availableQty } = req.body;
    const updateSuplier = {
        itemName, itemCode, itemFee, itemDescription, availableQty
    } 
    const update = await Suplier.findByIdAndUpdate(suplierId, updateSuplier)


    .then(() => {
        res.status(200).send({status: "Suplier Updated"})
    }).catch(err => {
        res.status(500).send({status: "Error with updating data", error: err.message})
    })
})

//Delete suplier
router.route("/delete/:id").delete(async(req, res) => {
    let suplierId = req.params.id;
    await Suplier.findByIdAndDelete(suplierId)
    .then(() => {
        res.status(200).send({status: "Suplier Deleted"})
    }).catch(err => {
        res.status(500).send({status: "Error with deleting suplier", error: err.message})
    })
})

//Get details of all supliers
router.route("/get/:itemCode").get(async(req, res) => {
    let itemCode = req.params.itemCode;
    
    await Suplier.findOne({ itemCode: itemCode })
        .then(suplier => {
            if (!suplier) {
                return res.status(404).send({ status: "suplier not found" });
            }
            res.status(200).send({ status: "suplier fetched", suplier });
        })
        .catch(err => res.status(500).send({ status: "Error with getting suplier", error: err.message }));
});

module.exports = router;