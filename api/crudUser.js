import {graphqlRequest} from "./todoAPI";


const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const DELETE_USER =
    `mutation($id:ID!){
        deleteUsers(
            where: { id: $id }
        ){
            nodesDeleted
        }
    }`

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

const FIND_USER =
    `query($username:String!){
            users(
                where: { username: $username }
                ){
                    id
                    username
                }
        }`




export function signUp(username, password) {
    return graphqlRequest(SIGN_UP, {username, password})
        .then(data => data.signUp)
}

export function signIn(username, password) {
    return graphqlRequest(SIGN_IN, {username, password})
        .then(data => data.signIn)
}

export function changeUserName(oldUserName, newUserName, token) {
    return graphqlRequest(CHANGE_USERNAME, {oldUserName, newUserName}, token)
        .then(data => data.updateUsers.users[0].username).catch(err => {
            console.log(err);
            throw err;
        })
}

export function deleteUser(id, token) {
    return graphqlRequest(DELETE_USER, {id}, token)
        .then(data => data.deleteUsers.nodesDeleted)
}

export function getUser(username, token) {
    return graphqlRequest(USER, {username}, token)
        .then(data => data.users[0])
}

export function getUsers(token) {
    return graphqlRequest(USERS, {}, token)
        .then(data => data.users).catch(err => {
            console.log(err);
            throw err;
        })
}
