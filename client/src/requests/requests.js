const BASE = 'http://localhost:5002/api';
const users = `${BASE}/users`;

const requests = {
    Users: {
        /**
         * HEADER: (Content-Type)
         * BODY: (email, name, password)
         */
        Registration: users,

        /**
         * HEADER: (userId, x-auth-token , Content-Type)
         * BODY: (userId)
         */
        DeleteUserByID: `${users}`,

        /**
         * HEADER: (userId, x-auth-token , Content-Type)
         * BODY: 
         */
        GetAllUsers: `${users}/getAllUsers`,

        /**
         * HEADER: (userId, x-auth-token , Content-Type)
         * BODY: (email, password)
         */
        Login: `${users}/login`,

        /**
         * HEADER: (userId, x-auth-token , Content-Type)
         * BODY: (userId, email, name, password, permission)
         */
        UpdateUser: `${users}`,
    },
};

export default requests;