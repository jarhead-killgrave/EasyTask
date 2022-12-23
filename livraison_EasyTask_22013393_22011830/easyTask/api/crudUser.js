import {graphqlRequest} from "./todoAPI";

/**
 * A GraphQL mutation that sign in a user.
 * @type {string}
 */
const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

/**
 * A GraphQL mutation that sign up a user.
 * @type {string}
 */
const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

/**
 * A GraphQL mutation that deletes a specific user according to its id
 * @type {string}
 */
const DELETE_USER =
    `mutation($id:ID!){
        deleteUsers(
            where: { id: $id }
        ){
            nodesDeleted
        }
    }`

/**
 * A GraphQL mutation that finds a specific user according to its username
 * @type {string}
 */
const USER =
    `query($username:String!){
            users(
                where: { username: $username }
                ){
                    id
                    username
                    roles
                }
        }`

/**
 * A GraphQL mutation that finds all users
 * @type {string}
 */
const USERS =
    `query{
            users{
                id
                username
                roles
            }
        }`


const CHANGE_USERNAME =
    `
    mutation changeUserName($oldUserName: String!, $newUserName: String!){
      updateUsers(
        where: {username : $oldUserName}
        update: {username : $newUserName}
      ){users
        {username}
      }
    }
    `


/**
 * signIn is a function that signs up a user using a GraphQL mutation.
 * @param {string} username - The username of the user to sign in.
 * @param {string} password - The password of the user to sign in.
 * @return {Promise<string>} - A promise that resolves to the authentication token.
 * @throws {Error} - If an error occurs while making the request or parsing the response
 */
export function signUp(username, password) {
    return graphqlRequest(SIGN_UP, {username, password})
        .then(data => data.signUp)
        .catch(error => {
            throw error;
        });
}

/**
 * signIn is a function that signs in a user using a GraphQL mutation.
 * @param {string} username - The username of the user to sign in.
 * @param {string} password - The password of the user to sign in.
 * @return {Promise<string>} - A promise that resolves to the authentication token.
 * @throws {Error} - If an error occurs while making the request or parsing the response
 */
export function signIn(username, password) {
    return graphqlRequest(SIGN_IN, {username, password})
        .then(data => data.signIn).catch(error => {
            throw error;
        })
}

/**
 * changeUserName is a function that update the username of a user using a GraphQL mutation.
 * @param {string} oldUserName - The username of the user to update.
 * @param {string} newUserName - The new username of the user.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<string>} - A promise that resolves to the authentication token.
 * @throws {Error} - If an error occurs while making the request or parsing the response
 */
export function changeUserName(oldUserName, newUserName, token) {
    // Check if the new username is already taken
    return graphqlRequest(USER, {username: newUserName}, token)
        .then(data => {
            if (data.users.length > 0) {
                throw new Error("Username already taken");
            }
            return graphqlRequest(CHANGE_USERNAME, {oldUserName, newUserName}, token)
                .then(data => data.updateUsers.users[0].username)
                .catch(error => {
                    throw error;
                });
        })
}

/**
 * deleteUser is a function that deletes a user using a GraphQL mutation.
 * @param {string} id - The id of the user to delete.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<number>} - A promise that resolves to the number of users deleted.
 * @throws {Error} - If an error occurs while making the request or parsing the response
 */
export function deleteUser(id, token) {
    return graphqlRequest(DELETE_USER, {id}, token)
        .then(data => data.deleteUsers.nodesDeleted)
        .catch(error => {
            throw error;
        });
}

/**
 * getUser is a function that finds a user using a GraphQL query.
 * @param {string} username - The username of the user to find.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<Object>} - A promise that resolves to the user.
 */
export function getUser(username, token) {
    return graphqlRequest(USER, {username}, token)
        .then(data => data.users[0])
        .catch(error => {
            throw error;
        });
}

/**
 * getUsers is a function that finds all users using a GraphQL query.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<Array>} - A promise that resolves to the users.
 */
export function getUsers(token) {
    return graphqlRequest(USERS, {}, token)
        .then(data => data.users).catch(err => {
            throw err;
        })
}
