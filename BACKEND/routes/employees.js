const router = require("express").Router();
let Employee = require("../models/employee");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Create Employee with Image Upload
router.post("/create", upload.single("image"), (req, res) => {
  const {
    fullName,
    nationalID,
    dateOfBirth,
    gender,
    address,
    contactNumber,
    emailAddress,
    employeeID,
    jobRole,
    dateOfJoining,
    yearsOfExperience,
    specializedSkills,
    bankAccountNumber,
    salary,
  } = req.body;

  const imageUrl = req.file ? req.file.filename : null;

  // Ensure imageUrl is not null if required
  if (!imageUrl) {
    return res.status(400).json("Error: Image is required.");
  }

  const newEmployee = new Employee({
    fullName,
    nationalID,
    dateOfBirth,
    gender,
    address,
    contactNumber,
    emailAddress,
    employeeID,
    jobRole,
    dateOfJoining,
    yearsOfExperience,
    specializedSkills: typeof specializedSkills === 'string' ? specializedSkills.split(",") : [], // Safely split only if it's a string
    bankAccountNumber,
    salary,
    imageUrl,
  });

  newEmployee
    .save()
    .then(() => res.json("Employee registered successfully!"))
    .catch((err) => res.status(400).json("Error: " + err.message));
});

// Read All Employees
router.get("/", (req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err.message));
});

// Update Employee with Image Upload
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const employeeId = req.params.id;
  const {
    fullName,
    nationalID,
    dateOfBirth,
    gender,
    address,
    contactNumber,
    emailAddress,
    employeeID,
    jobRole,
    dateOfJoining,
    yearsOfExperience,
    specializedSkills,
    bankAccountNumber,
    salary,
  } = req.body;

  const imageUrl = req.file ? req.file.filename : req.body.imageUrl;

  const updateEmployee = {
    fullName,
    nationalID,
    dateOfBirth,
    gender,
    address,
    contactNumber,
    emailAddress,
    employeeID,
    jobRole,
    dateOfJoining,
    yearsOfExperience,
    specializedSkills: typeof specializedSkills === 'string' ? specializedSkills.split(",") : [], // Safely split only if it's a string
    bankAccountNumber,
    salary,
    imageUrl,
  };

  await Employee.findByIdAndUpdate(employeeId, updateEmployee)
    .then(() => res.status(200).send({ status: "Employee details updated" }))
    .catch((err) =>
      res.status(500).send({ status: "Error with updating data", error: err.message })
    );
});

// Delete Employee
router.delete("/delete/:id", async (req, res) => {
  const employeeId = req.params.id;

  await Employee.findByIdAndDelete(employeeId)
    .then(() => res.status(200).send({ status: "Employee deleted" }))
    .catch((err) =>
      res.status(500).send({ status: "Error with deleting employee", error: err.message })
    );
});

// Get Details of One Employee
router.get("/get/:id", async (req, res) => {
  const employeeId = req.params.id;

  await Employee.findById(employeeId)
    .then((employee) =>
      res.status(200).send({ status: "Employee details fetched", employee })
    )
    .catch((err) =>
      res.status(500).send({ status: "Error with fetching employee", error: err.message })
    );
});

module.exports = router;
