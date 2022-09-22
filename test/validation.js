// validation.js

module.exports = {
    isEmail: (value) => {
        const email = (value || '');

        if (email.split('@').length !== 2) {
            return false;
        } else if (email.includes(' ')) {
            return false;
        } else if (email[0] === '-') {
            return false;
        }

        return true;
    },
};