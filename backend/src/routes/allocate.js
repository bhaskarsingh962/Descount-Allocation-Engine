// src/routes/allocate.js

import express from 'express';
import { allocateDiscount } from '../services/allocator.js';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { siteKitty, salesAgents, minPerAgent, maxPerAgent } = req.body;
    const result = allocateDiscount({ siteKitty, salesAgents, minPerAgent, maxPerAgent });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
