import express from 'express';
import { reviewController } from './review.controller';

const router = express.Router();

router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReviewsByBookId);

export const reviewRoutes = router;
