import {graphqlRequest} from "./todoAPI";

/**
 * GraphQL query that  retrieves a list of task lists owned by a given user.
 * @type {string}
 */
const TASK_LISTS =
    `query($username:String!){
         taskLists(
            where: { owner: { username: $username } }
            ){
                id
                title
            }
    }`

/**
 * GraphQL's mutation that creates a new task list for a given user.
 * @type {string}
 */
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

/**
 * GraphQL's mutation that deletes a specific task list.
 * @type {string}
 */
const DELETE_TASK_LIST =
    `mutation($id: ID!) {
        deleteTaskLists(where: { id: $id }) {
            nodesDeleted
        }
    }`


/**
 * getTaskLists is a function that retrieves a list of task lists owned by a given user using a GraphQL query.
 * @param {string} username - The username of the user whose task lists are to be retrieved.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<Array>} - A promise that resolves to an array of task lists.
 * @throws {Error} - If an error occurs while making the request or parsing the response
 */
export function getTaskLists(username, token) {
    return graphqlRequest(TASK_LISTS, {username}, token)
        .then(data => data.taskLists)
        .catch(error => {
            throw error;
        });
}

/**
 * createTaskList is a function that creates a new task list for a given user using a GraphQL mutation.
 * @param {string} title - The title of the new task list.
 * @param {string} username - The username of the user who will own the new task list.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<Object>} - A promise that resolves to the newly created task list.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function createTaskList(title, username, token) {
    return graphqlRequest(CREATE_TASK_LIST, {title, username}, token)
        .then(data => data.createTaskLists.taskLists[0])
        .catch(error => {
            throw error;
        });
}

/**
 * deleteTaskList is a function that deletes a specific task list using a GraphQL mutation.
 * @param {string} id - The ID of the task list to delete.
 * @param {string} token - The authentication token to include in the header of the request.
 * @return {Promise<number>} - A promise that resolves to the number of task lists deleted.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function deleteTaskList(id, token) {
    return graphqlRequest(DELETE_TASK_LIST, {id: id}, token)
        .then(data => data.deleteTaskLists.nodesDeleted)
        .catch(error => {
            throw error;
        });
}

// Path: api/crudTask.js
