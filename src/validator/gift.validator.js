const {check} = require('express-validator')


const validateGiftCreation = [
    check('age','age should not be empty and should be a valid number').notEmpty().isInt(),
    check('budget','budget should not be empty and should be a valid number').notEmpty().isNumeric(),
    check('interests','interests should not be empty').notEmpty(),
    check('gender','gender should not be empty').notEmpty(),
]


module.exports = validateGiftCreation;