const { createUserServices, getJWTServices, validateJWTServices } = require('../services/ecomAuthServices')

const createUserControllers = async (req, res) => {
    try {
        const { username, password, role } = req.body
        const newUser = await createUserServices(username, password, role)
        if (role === 'admin') {
            return res.status(201).json({ message: 'Admin created successfully', username: newUser.username, role: newUser.role })
        }
        res.status(201).json({ message: 'User created successfully', username: newUser.username, role: newUser.role })
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

const getJWTControllers = async (req, res) => {
    try {
        const { username, password, role } = req.body
        const token = await getJWTServices(username, password, role)
        res.status(200).json({token })
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

const validateJWTControllers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(400).json({ message: 'Token not found', validate: false })
        }
        const decoded = await validateJWTServices(token)
        return res.status(200).json({ username: decoded.username, role:decoded.role ,validate: true })
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

module.exports = {
    createUserControllers,
    getJWTControllers,
    validateJWTControllers
}