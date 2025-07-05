import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);

    const result = await query(`
      SELECT 
        c.id,
        c.content,
        c.likes_count,
        c.parent_comment_id,
        c.created_at,
        u.id as user_id,
        u.username,
        u.first_name,
        u.last_name,
        u.profile_picture_url
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [postId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a comment to a post
router.post('/', authenticateToken, [
  body('postId').isInt(),
  body('content').isLength({ min: 1, max: 1000 }).trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { postId, content, parentCommentId } = req.body;
    const userId = req.user.userId;

    // Check if post exists
    const postExists = await query('SELECT id FROM posts WHERE id = $1', [postId]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create comment
    const result = await query(
      'INSERT INTO comments (post_id, user_id, content, parent_comment_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [postId, userId, content, parentCommentId || null]
    );

    const comment = result.rows[0];

    // Update post comments count
    await query('UPDATE posts SET comments_count = comments_count + 1 WHERE id = $1', [postId]);

    // Get user info for the response
    const userResult = await query(
      'SELECT username, first_name, last_name, profile_picture_url FROM users WHERE id = $1',
      [userId]
    );

    const user = userResult.rows[0];

    res.status(201).json({
      id: comment.id,
      postId: comment.post_id,
      content: comment.content,
      likesCount: comment.likes_count,
      parentCommentId: comment.parent_comment_id,
      createdAt: comment.created_at,
      user: {
        id: userId,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePicture: user.profile_picture_url
      }
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like/unlike a comment
router.post('/:commentId/like', authenticateToken, async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const userId = req.user.userId;

    // Check if comment exists
    const commentExists = await query('SELECT id FROM comments WHERE id = $1', [commentId]);
    if (commentExists.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user already liked the comment
    const existingLike = await query(
      'SELECT id FROM comment_likes WHERE comment_id = $1 AND user_id = $2',
      [commentId, userId]
    );

    if (existingLike.rows.length > 0) {
      // Unlike the comment
      await query('DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2', [commentId, userId]);
      await query('UPDATE comments SET likes_count = likes_count - 1 WHERE id = $1', [commentId]);
      
      res.json({ message: 'Comment unliked', liked: false });
    } else {
      // Like the comment
      await query('INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2)', [commentId, userId]);
      await query('UPDATE comments SET likes_count = likes_count + 1 WHERE id = $1', [commentId]);
      
      res.json({ message: 'Comment liked', liked: true });
    }
  } catch (error) {
    console.error('Like comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
