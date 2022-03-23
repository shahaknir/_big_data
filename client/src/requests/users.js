import requests from "./requests.js";
import axios from "axios";


const users = {
    registration: async (userData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        const result = await fetch(requests.Users.Registration, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.errors) || response.status;
                    return Promise.reject(error);
                }
                return data;
                // console.log("data", data)
            })
            .catch(errors => {
                // console.error(errors);
                return { errors }
            });
        return result;
    },
    login: async (userData) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        const result = await fetch(requests.Users.Login, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.errors);
                    return Promise.reject(error);
                }
                return data;
                // console.log("data", data)
            })
            .catch(errors => {
                // console.error(errors);
                return { errors }
            });
        return result;
    },
    deleteUser: async (userAction, userData) => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userAction.token,
                'userId': userAction.userId
            },
            body: JSON.stringify(userData)
        };
        const result = await fetch(requests.Users.Registration, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.errors) || response.status;
                    return Promise.reject(error);
                }
                return data;
                // console.log("data", data)
            })
            .catch(errors => {
                // console.error(errors);
                return { errors }
            });
        return result;
    },
    updateUser: async (userAction, userData) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userAction.token,
                'userId': userAction.userId
            },
            body: JSON.stringify(userData)
        };
        const result = await fetch(requests.Users.UpdateUser, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.errors) || response.status;
                    return Promise.reject(error);
                }
                return data;
                // console.log("data", data)
            })
            .catch(errors => {
                // console.error(errors);
                return { errors }
            });
        return result;
    },
    getAllUsers: async (userAction) => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userAction.token,
                'userId': userAction.userId

            },
        };
        const result = await fetch(requests.Users.GetAllUsers, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.errors) || response.status;
                    return Promise.reject(error);
                }
                return data;
                // console.log("data", data)
            })
            .catch(errors => {
                // console.error(errors);
                return { errors }
            });
        return result;
    },
};


export default users;