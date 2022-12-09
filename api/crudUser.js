//const API_URL = 'http://192.168.56.101:4000'
const API_URL = 'http://localhost:4000'
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
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: SIGN_UP,
            variables: {
                username: username,
                password: password,
            },
        }),
    })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((json) => {
            if (json.errors !== null) {
                throw new json.errors[0]
            }
            console.log(json.data);
            return json.data.signUp
        })
}


export function signIn (username, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_IN,
            variables: {
                username: username,
                password: password
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.signIn
        })
        .catch(error => {
            throw error
        })
}
