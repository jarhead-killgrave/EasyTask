//const API_URL = 'http://192.168.56.101:4000'
const API_URL = 'http://localhost:4000'
const TASK_LISTS =
    `query($username:String!){
         taskLists(
            where: { owner: { username: $username } }
            ){
                id
                title
            }
    }`

const CREATE_TASK_LIST =
    `mutation($title:String!, $username:String!){
        createTaskList(
            input: {
                title: $title,
                owner: { 
                    connect: { where: { username: $username } }
                }
            }
        ){
           taskLists{
                id
                title
                owner{
                    username
                }
            }
        }
    }`

const DELETE_TASK_LIST =
    `mutation($id:ID!){
        deleteTaskList(
            where: { id: $id }
        ){
            taskLists{
                id
                title
                owner{
                    username
                }
            }
        }
    }`

const UPDATE_TASK_LIST =
    `mutation($id:ID!, $title:String!){
        updateTaskList(
            where: { id: $id },
            input: { title: $title }
        ){
            taskLists{
                id
                title
                owner{
                    username
                }
            }
        }
    }`


export function getTaskLists(username) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: TASK_LISTS,
            variables: {
                username: username
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
            return jsonResponse.data.taskLists
        })
}

export function createTaskList(title, username) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: CREATE_TASK_LIST,
            variables: {
                title: title,
                username: username
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
            return jsonResponse.data.createTaskList.taskLists
        })
}

export function deleteTaskList(id) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: DELETE_TASK_LIST,
            variables: {
                id: id
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
            return jsonResponse.data.deleteTaskList.taskLists
        })
}

export function updateTaskList(id, title) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: UPDATE_TASK_LIST,
            variables: {
                id: id,
                title: title
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
            return jsonResponse.data.updateTaskList.taskLists
        })
}

// Path: api/crudTask.js
