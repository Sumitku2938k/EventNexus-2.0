const {z} = require('zod');

// Validation schema for user registration
const signUpSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .trim() // Remove leading and trailing whitespace
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, { message: 'Username must be at most 20 characters long' }),
    email: z
        .string({ required_error: 'Email is required' })
        .trim() 
        .lowercase() // Convert email to lowercase
        .email({ message: 'Invalid email address' })
        .min(5, { message: 'Email must be at least 5 characters long' })
        .max(50, { message: 'Email must be at most 50 characters long' }),
    password: z
        .string({ required_error: 'Password is required' })
        .trim()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(100, { message: 'Password must be at most 100 characters long' }),
});

module.exports = { signUpSchema };