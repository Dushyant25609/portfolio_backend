const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Form = require('./models/form');
const formSchema = require('./Validation');
const connectDb = require('./db')

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.post('/submit-form', async (req, res) => {
  try {
    const validatedData = formSchema.parse(req.body);
    const form = new Form(validatedData);
    await form.save();

    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
