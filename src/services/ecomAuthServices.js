const { Users } = require('../../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserServices = async (username, password, role) => {
    try {
        const user = await Users.findOne({ where: { username } })
        if (user) {
            throw new Error('User already exists')
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = await Users.create({
            username,
            password: encryptedPassword,
            role
        })
        return newUser
    }
    catch (err) {
        throw err
    }
}

const getJWTServices = async (username, password) => {
    try {
        const user = await Users.findOne(
            {
                where: {
                    username
                }
            }
        )
        if(!user){
            throw new Error('User not found')
        }
        if(!await bcrypt.compare(password,user.password)){
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({username: user.username, role: user.role},process.env.JWT_SECRET_KEY)
        return token
    }
    catch (err) {
        throw err
    }
}

const validateJWTServices = async (token) => {
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        return decoded
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    createUserServices,
    getJWTServices,
    validateJWTServices
}