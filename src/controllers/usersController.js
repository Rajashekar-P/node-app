const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

const { getAllUsersService, createUserService, getUserByIDService, updateUserService, deleteUserService, getUserByEmailService } = require("../services/userService");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await createUserService(name, email, hashedPassword);
    return res.status(201).json({ status: 201, message: 'New User is created', user: newUser})
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message})
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    res.status(500)
    throw new Error("All fields are mandatory");
  }

  const user = await getUserByEmailService(email)
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Email is not valid' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Password is Invalid' });
  }

  const accessToken = generateAccessToken(user)

  const refreshToken = jwt.sign({ id: user.id, name: user.name }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2d' } 
  )

  return res.status(200).json({ message: 'Login success', accessToken, refreshToken: refreshToken });
}

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '5m' }
  );
}


const getAllUsers = async (req, res) => {
   const users = await getAllUsersService();
   res.status(200).json({ message: 'List of all users', users: users }) 
};

const getUserByID = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await getUserByIDService(id);

    if (user) {
      res.status(200).json({ message: 'User found', user: user });
    } else {
      res.status(404).json({ status: 404, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id

  const user = updateUserService(id);
  res.status(200).json({ message: 'Updated the User', user: user})
}

const deleteUser = async (req, res) => {
  const id = req.params.id

  try {
    const deletedUser = await deleteUserService(id);

    if (!deletedUser) {
      res.status(404).json({ status: 404, message: 'User not found' });
    }
    res.status(200).json({ status: 200, message: 'User deleted', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
  loginUser
};
