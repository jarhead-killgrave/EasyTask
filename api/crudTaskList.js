import {graphqlRequest} from "./todoAPI";

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
        createTaskLists(
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
        deleteTaskLists(
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




/**
 * getTaskLists is a function that sends a GraphQL query to a server to get a list of task lists.
 *
 * @param {string} username - The username of the user whose task lists should be retrieved.
 * @param {string} token - The authentication token to include in the request headers.
 * @returns {Promise} A promise that is resolved with the list of task lists.
 *                    If an error occurs, the promise is rejected with the error.
 */
export function getTaskLists(username, token) {
    return graphqlRequest(TASK_LISTS, { username }, token)
        .then(data => data.taskLists)
        .catch(error => {
            throw error;
        });
}

/**
 * createTaskList is a function that sends a GraphQL mutation to a server to create a new task list.
 *
 * @param {string} title - The title of the new task list.
 * @param {string} username - The username of the user who is creating the task list.
 * @param {string} token - The authentication token to include in the request headers.
 * @returns {Promise} A promise that is resolved with the new task list.
 *                    If an error occurs, the promise is rejected with the error.
 */
export function createTaskList(title, username, token) {
    return graphqlRequest(CREATE_TASK_LIST, { title, username }, token)
        .then(data => data.createTaskLists.taskLists)
        .catch(error => {
            throw error;
        });
}

/**
 * Delete a task list
 * @param {string} id
 * @param {string} token
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export function deleteTaskList(id, token) {
    return graphqlRequest(DELETE_TASK_LIST, { id: id }, token)
        .then(data => data.deleteTaskLists.taskLists)
}

/**
 * Update a task list
 * @param {string} id
 * @param {string} title
 * @param {string} token
 */
export function updateTaskList(id, title, token) {
    return graphqlRequest(UPDATE_TASK_LIST, { id: id, title: title }, token)
        .then(data => data.updateTaskList.taskLists)
}



// Path: api/crudTask.js
