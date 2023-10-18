import type { Request, Response } from 'express';
import { WhereOptions } from 'sequelize/types/model';

import Reaction from '../models/Reaction';

function filterChecker(postId: unknown, replyId: unknown, commentId: unknown) {
    return [postId, replyId, commentId].filter(i => !!i).length === 1;
}
export const createReaction = async (request: Request, response: Response) => {
    const { reaction, replyId, commentId, postId } = request.body;

    if (!filterChecker(postId, replyId, commentId)) {
        response.status(500).json({ error: 'Reaction can only belong to one entity' });
        // Have got Error: Can't render headers after they are sent to the client if don't return

        return;
    }
    const { user } = response.locals;

    try {
        const createdReaction = await Reaction.create({
            commentId,
            postId,
            reaction,
            replyId,
            userId: user.id,
        });

        response.status(201).json({ reaction: createdReaction });
    } catch (error) {
        response.status(500).json({ error: 'Failed to create reaction' });
    }
};
export const deleteReaction = async (request: Request, response: Response) => {
    const reactionId = request.params.id;
    const { user } = response.locals;

    try {
        await Reaction.destroy({ where: { id: reactionId, userId: user.id } });

        response.status(201).json({ success: true });
    } catch (error) {
        response.status(500).json({ error: 'Failed to delete reaction' });
    }
};

export const getReactions = async (request: Request, response: Response) => {
    const { replyId, commentId, postId } = request.query;
    const { user } = response.locals;

    if (!filterChecker(postId, replyId, commentId)) {
        response.status(500).json({ error: 'Filter can be applied only for one entity' });
        // Have got Error: Can't render headers after they are sent to the client if don't return

        return;
    }

    try {
        const whereCondition: WhereOptions<Reaction> = { userId: user.id };

        if (typeof commentId === 'string') {
            whereCondition.commentId = commentId;
        }

        if (typeof postId === 'string') {
            whereCondition.postId = postId;
        }

        if (typeof replyId === 'string') {
            whereCondition.replyId = replyId;
        }

        const reactions = await Reaction.findAll({
            where: whereCondition,
        });

        response.status(201).json({ reactions });
    } catch (error) {
        response.status(500).json({ error: 'Failed to get reactions' });
    }
};
