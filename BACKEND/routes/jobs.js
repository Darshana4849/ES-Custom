const router = require("express").Router();
const nodemailer = require("nodemailer");
let Job = require("../models/job");

// Nodemailer transporter setup
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ecustoms39@gmail.com', // Your Gmail
        pass: 'wkcp iqsj xmng jryg'  // Replace with the App Password from Google
    }
});

// Create job
router.route("/create").post((req, res) => {
    const { clientName, email, vehIdentityNumber, typeOfService, serDescription } = req.body;

    const newJob = new Job({
        clientName,
        email,
        vehIdentityNumber,
        typeOfService,
        serDescription
    });

    newJob.save()
        .then(async (job) => {
            // Send email after job is saved
            const mailOptions = {
                from: 'ecustoms39@gmail.com',
                to: email, // Send to client's email
                subject: 'Job Registration Confirmation',
                text: `Hello ${clientName},\n\nYour job has been successfully registered. We will contact you soon regarding the service for vehicle ID: ${vehIdentityNumber}.\n\nThank you for choosing us!\n\nRegards,\nES Customs Team`,
                html: `<p>Hello ${clientName},</p>
                       <p>Your job has been successfully registered. We will contact you soon regarding the service for vehicle ID: <strong>${vehIdentityNumber}</strong>.</p>
                       <p>Thank you for choosing us!</p>
                       <p>Regards,<br>ES Customs Team</p>`
            };

            await transporter.sendMail(mailOptions);
            return res.json({ message: "Job added and email sent!" });
        })
        .catch(err => res.status(400).json("Error: " + err));
});

// Read job
router.route("/").get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json("Error: " + err));
});

// Update job
router.route("/update/:id").put(async(req, res) => {
    let jobId = req.params.id;
    const { clientName, email, vehIdentityNumber, typeOfService, serDescription } = req.body;
    const updateJob = {
        clientName, email, vehIdentityNumber, typeOfService, serDescription
    };

    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateJob, { new: true });
        
        // Send email after job is updated
        const mailOptions = {
            from: 'ecustoms39@gmail.com',
            to: email, // Send to client's email
            subject: 'Job Update Confirmation',
            text: `Hello ${clientName},\n\nYour job has been successfully updated. We will contact you soon regarding the service for vehicle ID: ${vehIdentityNumber}.\n\nThank you for choosing us!\n\nRegards,\nES Customs Team`,
            html: `<p>Hello ${clientName},</p>
                   <p>Your job has been successfully updated. We will contact you soon regarding the service for vehicle ID: <strong>${vehIdentityNumber}</strong>.</p>
                   <p>Thank you for choosing us!</p>
                   <p>Regards,<br>ES Customs Team</p>`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send({ status: "Job Updated and email sent", job: updatedJob });
    } catch (err) {
        return res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete job
router.route("/delete/:id").delete(async(req, res) => {
    let jobId = req.params.id;
    await Job.findByIdAndDelete(jobId)
        .then(() => res.status(200).send({ status: "Job Deleted" }))
        .catch(err => res.status(500).send({ status: "Error with deleting job", error: err.message }));
});

// Get details of one job
router.route("/get/:vehIdentityNumber").get(async(req, res) => {
    let vehIdentityNumber = req.params.vehIdentityNumber;
    
    await Job.findOne({ vehIdentityNumber: vehIdentityNumber })
        .then(job => {
            if (!job) {
                return res.status(404).send({ status: "Job not found" });
            }
            res.status(200).send({ status: "Job fetched", job });
        })
        .catch(err => res.status(500).send({ status: "Error with getting job", error: err.message }));
});

module.exports = router;
