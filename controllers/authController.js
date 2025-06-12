const createError = require('../utils/createError')
const TryCatch = require('../utils/TryCatch')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

/// Check isEamil or isPhonenumber?? : for using find user @Uniqe in data
const checkEmailorPhone = (identity) => {
    let identityKEY = ""
    if (/^[0-9]{10,15}$/.test(identity)) {
        identityKEY = 'phoneNumber'
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identity)) {
        identityKEY = 'email'
    }
    if (!identityKEY) {
        throw createError(400, 'only email or phone number')
    }
    return identityKEY
}
///// API Register create new User
exports.authSignup = TryCatch(async (req, res, next) => {
    console.log("req.body", req.body);
    for (const key in req.body) {
        // console.log(key);
        if (!req.body[key]) {
            throw createError(400, "Please fill all data")
        }
    }

    const identityKEY = checkEmailorPhone(req.body.identity) //email or phoneNumber
    ///// Check Duplicate User:
    const dupUser = await prisma.user.findUnique({
        where: { [identityKEY]: req.body.identity }
    })
    if (dupUser) {
        throw createError(400, `Already exist this ${identityKEY}`)
    }
    // console.log(identityKEY);
    const { identity, ...userInfo } = req.body
    // console.log('userInfo', userInfo);
    ///// Create new User:
    const hashedPassword = await bcrypt.hash(userInfo.password, 10)
    const newUser = await prisma.user.create({
        data: {
            [identityKEY]: identity,
            password: hashedPassword,
        }
    })
    console.log('newUser', newUser);

    // GENERATE TOKEN AFTER SIGNINED
    const token = jwt.sign(
        { userID: newUser.userID, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    const { password, ...userWithoutPassword } = newUser;
    res.status(200).json({ status: "SUCCESS", message: "Register already", token, results: userWithoutPassword })

})
////// API Login validate User in DB and Generate TOKEN
exports.authSignin = TryCatch(async (req, res) => {
    console.log('req.body', req.body);
    ///// Check User registered into DB?? :
    const identityKEY = checkEmailorPhone(req.body.identity)
    console.log('identityKEY', identityKEY);
    /// Find in DB:
    const userData = await prisma.user.findUnique({
        where: { [identityKEY]: req.body.identity }
    })
    if (!userData) {
        throw createError(404, "Not found User, Please to Register!")
    }

    // COMPARE THE PASSWORD WHEN SIGNINING
    const isMatch = await bcrypt.compare(req.body.password, userData.password)
    if (!isMatch) {
        throw createError(401, "Password is incorrect")
    }

    // GENERATE TOKEN AFTER SIGNINED
    const token = jwt.sign(
        { userID: userData.userID, email: userData.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    // Destructure GET PASSWORD OUT
    const { password, ...userWithoutPassword } = userData
    console.log('userWithoutPassword', userWithoutPassword);

    res.status(200).json({ status: "SUCCESS", message: "SignIn already", token, results: userWithoutPassword })
})