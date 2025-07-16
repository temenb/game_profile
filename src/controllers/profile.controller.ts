import { Request, Response } from 'express';
import { findProfile, upsertUserProfile } from '../services/profile.service';

export async function getProfile(req: Request, res: Response) {
    const userId = req.header('X-User-ID');
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const profile = await findProfile(userId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
}

export async function upsertProfile(req: Request, res: Response) {
    const userId = req.header('X-User-ID');
    const { nickname } = req.body;
    if (!userId || !nickname) return res.status(400).json({ message: 'Invalid request' });

    const profile = await upsertUserProfile(userId, nickname);
    res.json(profile);
}
