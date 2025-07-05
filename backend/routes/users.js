import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await query(
      'SELECT id, username, first_name, last_name, profile_picture_url, bio, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      profilePicture: user.profile_picture_url,
      bio: user.bio,
      createdAt: user.created_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user posts
router.get('/:userId/posts', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(`
      SELECT 
        p.id, 
        p.content, 
        p.image_url,
        p.likes_count,
        p.comments_count,
        p.created_at,
        u.id as user_id,
        u.username,
        u.first_name,
        u.last_name,
        u.profile_picture_url
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

    res.json({
      posts: result.rows,
      pagination: {
        page,
        limit,
        total: result.rowCount
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
