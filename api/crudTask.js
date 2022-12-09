//const API_URL = "http://192.168.56.101:4000";
const API_URL = "http://localhost:4000";
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
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: TASKS,
            variables: { taskListId: taskListId },
        }),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0];
            }
            return jsonResponse.data.tasks;
        }
        );
}

export function createTask(content, taskListId) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: CREATE_TASK,
            variables: { content: content, taskListId: taskListId },
        }),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0];
            }
            return jsonResponse.data.createTask.tasks;
        });
}

export function deleteTask(id) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: DELETE_TASK,
            variables: { id: id },
        }),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0];
            }
            return jsonResponse.data.deleteTask.tasks;
        });
}

export function updateTask(id, content, done) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: UPDATE_TASK,
            variables: { id: id, content: content, done: done },
        }),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0];
            }
            return jsonResponse.data.updateTask.tasks;
        });
}

// Path: api/crudTaskList.js
