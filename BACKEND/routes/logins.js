//login routes

const router = require("express").Router();
let Login = require("../models/login"); // Update to point to the signup model

// Create user (login)
router.route("/create").post((req, res) => {
    const { username, password } = req.body;

    const newUser = new Login({  // Changed from User to login
        username,
        password
    });

    newUser.save()
        .then(() => res.json("User Login successfull!"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Read all users (optional, for admin or testing)
router.route("/").get((req, res) => {
    Signup.find()  // Changed from User to Signup
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

// Update user details (optional)
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { username, email, phoneNumber, password } = req.body;
    const updateUser = { username, email, phoneNumber, password };

    await Signup.findByIdAndUpdate(userId, updateUser)  // Changed from User to Signup
        .then(() => {
            res.status(200).send({ status: "User Updated" });
        })
        .catch(err => {
            res.status(500).send({ status: "Error with updating user", error: err.message });
        });
});

// Delete user (optional)
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Signup.findByIdAndDelete(userId)  // Changed from User to Signup
        .then(() => {
            res.status(200).send({ status: "User Deleted" });
        })
        .catch(err => {
            res.status(500).send({ status: "Error with deleting user", error: err.message });
        });
});

// Get details of one user (optional)
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Signup.findById(userId)  // Changed from User to Signup
        .then(user => {
            res.status(200).send({ status: "User fetched", user });
        })
        .catch(err => {
            res.status(500).send({ status: "Error with getting user", error: err.message });
        });
});

module.exports = router;
