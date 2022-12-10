import {graphqlRequest} from "./todoAPI";

const TASKS =
    `query($taskListId:ID!){
        tasks(
            where: { taskList: { id: $taskListId } }
        ){
            id
            content
            done
        }
    }`;


const CREATE_TASK =
    `mutation($content:String!, $taskListId:ID!){
        createTask(
            input: {
                content: $content,
                taskList: { connect: { id: $taskListId } }
            }
        ){
            tasks{
                id
                content
                done
            }
        }
    }`;

const DELETE_TASK =
    `mutation($id:ID!){
        deleteTask(
            where: { id: $id }
        ){
            tasks{
                id
                content
                done
            }
        }
    }`;

const UPDATE_TASK =
    `mutation($id:ID!, $content:String!, $done:Boolean!){
        updateTask(
            where: { id: $id },
            input: { content: $content, done: $done }
        ){
            tasks{
                id
                content
                done
            }
        }
    }`;

export function getTasks(taskListId) {
    return graphqlRequest(TASKS, {taskListId})
        .then(data => data.tasks)
}

export function createTask(content, taskListId) {
    return graphqlRequest(CREATE_TASK, {content, taskListId})
        .then(data => data.createTask.tasks[0])
}

export function deleteTask(id) {
    return graphqlRequest(DELETE_TASK, {id})
        .then(data => data.deleteTask.tasks[0])
}

export function updateTask(id, content, done) {
    return graphqlRequest(UPDATE_TASK, {id, content, done})
        .then(data => data.updateTask.tasks[0])

}

// Path: api/crudTaskList.js
