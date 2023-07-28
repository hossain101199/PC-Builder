import express from 'express';

const router = express.Router();

router.post('/login');

router.post('/refresh-token');

export const authRoutes = router;
