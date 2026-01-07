import { Router } from 'express';
import {
  getAllMembers,
  getMemberById,
  getMemberChildren,
  getMemberAncestors,
  searchMembers,
} from '../controllers/members.js';

const router = Router();

// GET /api/members - Get all members
router.get('/', getAllMembers);

// GET /api/search?q=... - Search members
router.get('/search', searchMembers);

// GET /api/members/:id - Get single member
router.get('/:id', getMemberById);

// GET /api/members/:id/children - Get children of a member
router.get('/:id/children', getMemberChildren);

// GET /api/members/:id/ancestors - Get ancestors of a member
router.get('/:id/ancestors', getMemberAncestors);

export default router;
