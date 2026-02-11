const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6
    },
    role: { 
        type: String, 
        enum: ['student', 'admin'], 
        default: 'student',
        required: true
    }
});

//Secure password hashing before saving user to database
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) { //To check if user is old or new, if old then skip hashing
        console.log("Password not modified");
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); //Hash the password and save it to user object
        next();
    } catch (error) {
        console.log("Error in hashing password", error);
        next(error);
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;