import {graphqlRequest} from "./todoAPI";


const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const UPDATE_USER =
    `mutation($id:ID!, $username:String!, $password:String!){
        updateUser(
            where: { id: $id },
            input: { username: $username, password: $password }
        ){
            users{
                id
                username
                password
            }
        }
    }`

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




export function signUp(username, password) {
    return graphqlRequest(SIGN_UP, {username, password})
        .then(data => data.signUp)
}

export function signIn(username, password) {
    return graphqlRequest(SIGN_IN, {username, password})
        .then(data => data.signIn)
}

