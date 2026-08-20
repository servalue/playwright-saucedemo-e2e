// Valid standard SauceDemo user.
const standardUser = {
    username: 'standard_user',
    password: 'secret_sauce',
};

// Locked SauceDemo user.
const lockedUser = {
    username: 'locked_out_user',
    password: 'secret_sauce',
};

// Invalid credentials for negative tests.
const invalidUser = {
    username: 'wrong_user',
    password: 'wrong_password',
};

module.exports = {
    standardUser,
    lockedUser,
    invalidUser,
};