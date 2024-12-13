const router = require("express").Router();
const nodemailer = require("nodemailer");
const CompletedJob = require("../models/jobReport");

// Nodemailer transporter setup
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ecustoms39@gmail.com', // Your Gmail
        pass: 'wkcp iqsj xmng jryg'  // Replace with the App Password from Google
    }
});

// Create completed job
router.route("/create").post(async (req, res) => {
    const {
        clientName,
        email,
        vehIdentityNumber,
        typeOfService,
        serDescription,
        technicianName,
        technicianID,
        completionDate,
        feedback,
        serviceCharge // Include serviceCharge from the request body
    } = req.body;

    const newCompletedJob = new CompletedJob({
        clientName,
        email,
        vehIdentityNumber,
        typeOfService,
        serDescription,
        technicianName,
        technicianID,
        completionDate,
        feedback,
        serviceCharge // Add serviceCharge to the new job
    });

    try {
        const savedJob = await newCompletedJob.save();

        // Send email after job is saved
        const mailOptions = {
            from: 'ecustoms39@gmail.com',
            to: email, // Send to client's email
            subject: 'Job Completion Confirmation',
            text: `Hello ${clientName},\n\nYour job for vehicle ID ${vehIdentityNumber} has been successfully completed. The service charge is LKR ${serviceCharge}.\nThank you for choosing us!\n\nRegards,\nES Customs Team`,
            html: `<p>Hello ${clientName},</p>
                   <p>Your job for vehicle ID <strong>${vehIdentityNumber}</strong> has been successfully completed. The service charge is <strong>LKR ${serviceCharge}</strong>.</p>
                   <p>Thank you for choosing us!</p>
                   <p>Regards,<br>ES Customs Team</p>`
        };

        await transporter.sendMail(mailOptions);
        return res.status(201).json({ message: "Completed job added and email sent!", job: savedJob });
    } catch (err) {
        return res.status(400).json({ message: "Error: " + err.message });
    }
});

// Read completed jobs
router.route("/").get(async (req, res) => {
    try {
        const completedJobs = await CompletedJob.find();
        return res.status(200).json(completedJobs);
    } catch (err) {
        return res.status(400).json({ message: "Error: " + err.message });
    }
});

// Update completed job
router.route("/update/:id").put(async (req, res) => {
    const jobId = req.params.id;
    const updateData = req.body;

    try {
        const updatedJob = await CompletedJob.findByIdAndUpdate(jobId, updateData, { new: true });

        // Send email after job is updated
        const mailOptions = {
            from: 'ecustoms39@gmail.com',
            to: updateData.email, // Send to client's email
            subject: 'Job Update Confirmation',
            text: `Hello ${updateData.clientName},\n\nYour completed job for vehicle ID ${updateData.vehIdentityNumber} has been updated. The service charge is now LKR ${updateData.serviceCharge}.\nThank you for choosing us!\n\nRegards,\nES Customs Team`,
            html: `<p>Hello ${updateData.clientName},</p>
                   <p>Your completed job for vehicle ID <strong>${updateData.vehIdentityNumber}</strong> has been updated. The service charge is now <strong>LKR ${updateData.serviceCharge}</strong>.</p>
                   <p>Thank you for choosing us!</p>
                   <p>Regards,<br>ES Customs Team</p>`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send({ status: "Completed job updated and email sent", job: updatedJob });
    } catch (err) {
        return res.status(500).send({ status: "Error with updating job", error: err.message });
    }
});

// Delete completed job
router.route("/delete/:id").delete(async (req, res) => {
    const jobId = req.params.id;

    try {
        await CompletedJob.findByIdAndDelete(jobId);
        return res.status(200).send({ status: "Completed job deleted" });
    } catch (err) {
        return res.status(500).send({ status: "Error with deleting completed job", error: err.message });
    }
});

// Get details of one completed job
router.route("/get/:vehIdentityNumber").get(async (req, res) => {
    const vehIdentityNumber = req.params.vehIdentityNumber;

    try {
        const completedJob = await CompletedJob.findOne({ vehIdentityNumber: vehIdentityNumber });
        if (!completedJob) {
            return res.status(404).send({ status: "Completed job not found" });
        }
        return res.status(200).send({ status: "Completed job fetched", job: completedJob });
    } catch (err) {
        return res.status(500).send({ status: "Error with getting completed job", error: err.message });
    }
});

module.exports = router;
