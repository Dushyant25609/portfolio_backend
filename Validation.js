const { z } = require('zod');

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    mobile: z.string().min(10, { message: "Mobile number should be 10 digits" }).max(10, { message: "Mobile number should be 10 digits" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    details: z.string().min(1, { message: "Details are required" }),
});
  
module.exports = formSchema;