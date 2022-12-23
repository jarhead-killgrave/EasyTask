import {graphqlRequest} from "./todoAPI";

/**
 * A GraphQL query that retrieves a list of tasks belonging to a specific task list.
 * @type {string}
 */
const TASKS =
    `query($taskListId: ID!) {
      tasks(where: { belongsTo: { id: $taskListId } }) {
        id
        content
        done
      }
    }`;

/**
 * A GraphQL mutation that creates a new task in a specific task list.
 * @type {string}
 */
const CREATE_TASK =
    `mutation createTask($taskListId: ID!, $content: String!) {
      createTasks(
        input: {
          belongsTo: { connect: { where: { id: $taskListId } } }
          content: $content
        }
      ) {
        tasks {
          id
          content
          done
        }
      }
    }
`;

/**
 * A GraphQL mutation that deletes a specific task.
 * @type {string}
 */
const DELETE_TASK =
    `mutation($id:ID!){
        deleteTasks(
            where: { id: $id }
        ){
            nodesDeleted
        }
    }`;

/**
 * A GraphQL mutation that updates the "done" status of a specific task.
 * @type {string}
 */
const SWITCH_TASK =
    `mutation($id:ID!, $done:Boolean!){
        updateTasks(
            where: { id: $id },
            update: { done: $done }
        ){
            tasks{
                id
                content
                done
            }
        }
    }`;

/**
 * A GraphQL mutation that updates the done status of all tasks in a specific task list.
 * @type {string}
 */
const MARK_ALL_TASKS =
    `mutation MarkAllTasks($taskListId: ID!, $done: Boolean!) {
      updateTasks(
        where: { belongsTo: { id: $taskListId } }
        update: { done: $done }
      ) {
        tasks {
          id
          content
          done
        }
      }
    }`

/**
 * getTasks is a function that retrieves a list of tasks from a server using a GraphQL query.
 * @param {string} taskListId - The ID of the task list to retrieve tasks for.
 * @param {string} token - The authentication token to include in the request headers.
 * @return {Promise<Array>} - A promise that resolves to an array of tasks.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function getTasks(taskListId, token) {
    return graphqlRequest(TASKS, {taskListId: taskListId}, token)
        .then(data => {
            return data.tasks;
        }).catch(error => {
            throw error;
        })
}

/**
 * createTask is a function that creates a new task on a server using a GraphQL mutation.
 * @param {string} taskListId - The ID of the task list to add the task to.
 * @param {string} token - The authentication token to include in the request headers.
 * @param {string} content - The content of the task to create.
 * @return {Promise<Object>} - A promise that resolves to the created task object.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function createTask(taskListId, token, content) {
    return graphqlRequest(CREATE_TASK, {taskListId: taskListId, content: content}, token)
        .then(data => data.createTasks.tasks[0])
        .catch(error => {
            throw error;
        })
}

/**
 * deleteTask is a function that deletes a task from a server using a GraphQL mutation.
 * @param {string} id - The ID of the task to delete.
 * @param {string} token - The authentication token to include in the request headers.
 * @return {Promise<Object>} - A promise that resolves to the deleted task object.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function deleteTask(id, token) {
    return graphqlRequest(DELETE_TASK, {id}, token)
        .then(data => data.deleteTasks.nodesDeleted).catch(
            error => {
                throw error;
            }
        )
}

/**
 * switchTask is a function that updates the "done" status of a task on a server using a GraphQL mutation.
 * @param {string} id - The ID of the task to update.
 * @param {string} token - The authentication token to include in the request headers.
 * @param {boolean} done - The new "done" status of the task.
 * @return {Promise<Object>} - A promise that resolves to the updated task object.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function switchTask(id, done, token) {
    return graphqlRequest(SWITCH_TASK, {id, done}, token)
        .then(data => data.updateTasks.tasks[0])
}

/**
 * markAllTasks is a function that updates the "done" status of all tasks in a task list on a server using a GraphQL mutation.
 * @param {string} taskListId - The ID of the task list to update tasks for.
 * @param {string} token - The authentication token to include in the request headers.
 * @param {boolean} done - The new "done" status of the tasks.
 * @return {Promise<Array>} - A promise that resolves to an array of updated task objects.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
 */
export function markAllTask(taskListId, done, token) {
    return graphqlRequest(MARK_ALL_TASKS, {taskListId, done}, token)
        .then(data => data.updateTasks.tasks)
}
