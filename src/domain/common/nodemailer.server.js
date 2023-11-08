import nodemailer from "nodemailer";


export let transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'thsalsqls@gmail.com',
        pass: 'bpfnardbubqmcxjq'
    }
})

transporter.verify(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log("Server is ready to take our message");
    }
})

export default transporter;
