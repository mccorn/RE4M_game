import { Router } from 'express';

import { createReaction, deleteReaction, getReactions } from '../controllers/reactionController';

const router = Router();

router.post('/', createReaction);
router.get('/', getReactions);
router.delete('/:id', deleteReaction);

export default router;
