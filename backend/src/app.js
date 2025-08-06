import express from 'express';
import cors from 'cors';
import allocateRoute from './routes/allocate.js';

const app = express();
// app.use(cors()); //
app.use(cors({
  origin: 'https://descount-allocation-engine-frontend.onrender.com'
}));

app.options('*', cors({
  origin: 'https://descount-allocation-engine-frontend.onrender.com'
}));

app.use(express.json());
app.use('/api/allocate-discounts', allocateRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;


