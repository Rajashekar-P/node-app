const express = require('express');

const { createUser, getAllUsers, getUserByID, updateUser,  deleteUser, loginUser } = require('../controllers/usersController');
const { default: authenticateToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserByID);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/login', loginUser);

router.get('/profile', authenticateToken , (req, res) => {
  res.status(200).json({ message: "Welcome back!", user: req.user });
});


module.exports = router;