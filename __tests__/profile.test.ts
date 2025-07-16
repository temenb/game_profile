import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const testUserId = 'test-user-id';
const nickname = 'TestPlayer';

beforeAll(async () => {
    await prisma.profile.deleteMany({ where: { userId: testUserId } });
});

afterAll(async () => {
    await prisma.profile.deleteMany({ where: { userId: testUserId } });
    await prisma.$disconnect();
});

describe('Profile API', () => {
    it('should reject unauthorized access', async () => {
        const res = await request(app).get('/me');
        expect(res.statusCode).toBe(401);
    });

    it('should create or update a profile', async () => {
        const res = await request(app)
            .post('/me')
            .set('X-User-ID', testUserId)
            .send({ nickname });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('nickname', nickname);
        expect(res.body).toHaveProperty('userId', testUserId);
    });

    it('should retrieve the profile', async () => {
        const res = await request(app)
            .get('/me')
            .set('X-User-ID', testUserId);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('nickname', nickname);
        expect(res.body).toHaveProperty('userId', testUserId);
    });
});
