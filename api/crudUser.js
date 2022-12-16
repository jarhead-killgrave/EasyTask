import {graphqlRequest} from "./todoAPI";


const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const DELETE_USER =
    `mutation($id:ID!){
        deleteUser(
            where: { id: $id }
        ){
            users{
                id
                username
                password
            }
        }
    }`

const USERS =
    `query($username:String!){
            users(
                where: { username: $username }
                ){
                    id
                    username
                    password
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
