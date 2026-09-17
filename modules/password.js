const authenticated = [];

var password = null;

module.exports = {

    // Sets the password
    init(password_) {

        password = password_;

    },

    // Processes password attempt
    input(source,attempted) {

        if(attempted == password) authenticated.push(source);
        
    },

    authed(source) {

        return authenticated.includes(source);

    }

}