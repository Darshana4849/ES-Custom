const router = require("express").Router();
const vehicle = require("../models/vehicle");
let Vehicle = require("../models/vehicle");

//Create vehicle
router.route("/create").post((req, res) => {
    const vehicleMake = req.body.vehicleMake;
    const vehicleModel = req.body.vehicleModel;
    const year = req.body.year;
    const vehIdentityNumber = req.body.vehIdentityNumber;
    const licenPlateNumber = req.body.licenPlateNumber;
    const engineNumber = req.body.engineNumber;

    const newVehicle = new Vehicle({
        vehicleMake,
        vehicleModel,
        year,
        vehIdentityNumber,
        licenPlateNumber,
        engineNumber
    });         

    newVehicle.save()
        .then(() => res.json("Vehicle added!"))
        .catch(err => res.status(400).json("Error: " + err));
});


//Read vehicle
router.route("/").get((req, res) => {
    Vehicle.find()
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json("Error: " + err));
});

//Update vehicle
router.route("/update/:id").put(async(req, res) => {
    let vehicleId = req.params.id;
    const { vehicleMake, vehicleModel, year, vehIdentityNumber, licenPlateNumber, engineNumber } = req.body;
    const updateVehicle = {
        vehicleMake, vehicleModel, year, vehIdentityNumber, licenPlateNumber, engineNumber
    } 
    const update = await Vehicle.findByIdAndUpdate(vehicleId, updateVehicle)

    .then(() => {
        res.status(200).send({status: "Vehicle Updated"})
    }).catch(err => {
        res.status(500).send({status: "Error with updating data", error: err.message})
    })
})


//Delete vehicle
router.route("/delete/:id").delete(async(req, res) => {
    let vehicleId = req.params.id;
    await Vehicle.findByIdAndDelete(vehicleId)
    .then(() => {
        res.status(200).send({status: "Vehicle Deleted"})
    }).catch(err => {
        res.status(500).send({status: "Error with deleting vehicle", error: err.message})
    })
})


//Get details of one vehicle
router.route("/get/:vehIdentityNumber").get(async(req, res) => {
    let vehIdentityNumber = req.params.vehIdentityNumber;
    
    await Vehicle.findOne({ vehIdentityNumber: vehIdentityNumber })
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).send({ status: "Vehicle not found" });
            }
            res.status(200).send({ status: "Vehicle fetched", vehicle });
        })
        .catch(err => res.status(500).send({ status: "Error with getting vehicle", error: err.message }));
});

module.exports = router;