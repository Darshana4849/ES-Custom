const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

if (!URL) {
    console.error("MongoDB URL is not defined in the .env file");
    process.exit(1); // Exit the process if MongoDB URL is not defined
}

console.log("MongoDB URL:", URL); // For debugging

app.use('/uploads', express.static  (path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if there is an error connecting to MongoDB
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success");
});

// Call to routes
const jobsRouter = require("./routes/jobs.js");
app.use("/job", jobsRouter);

const jobReportsRouter = require("./routes/jobReports.js");
app.use("/jobReport", jobReportsRouter);

const ordersRouter = require("./routes/orders.js");
app.use("/order", ordersRouter);

const SuplierRouter = require("./routes/Suplier.js");
app.use("/Suplier", SuplierRouter);

const vehicleRouter = require("./routes/vehicle.js");
app.use("/vehicle", vehicleRouter);

const SignupRouter = require("./routes/signups.js");
app.use("/signup", SignupRouter);

const LoginRouter = require("./routes/logins.js");
app.use("/login", LoginRouter);

const InvenotoryRouter = require("./routes/inventories.js");
app.use("/inventory", InvenotoryRouter);

const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});