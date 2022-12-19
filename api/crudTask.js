import {graphqlRequest} from "./todoAPI";

const TASKS =
    `query($taskListId: ID!) {
      tasks(where: { belongsTo: { id: $taskListId } }) {
        id
        content
        done
      }
    }`;

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

const DELETE_TASK =
    `mutation($id:ID!){
        deleteTasks(
            where: { id: $id }
        ){
            nodesDeleted
        }
    }`;

const UPDATE_TASK =
    `mutation($id:ID!, $content:String!, $done:Boolean!){
        updateTasks(
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

export function getTasks(taskListId, token) {
    return graphqlRequest(TASKS, {taskListId : taskListId}, token)
        .then(data => {
            return data.tasks;
        }).catch(error => {
            throw error;
        })
}

export function createTask(taskListId, token, content) {
    console.log("createTask");
    console.log(taskListId);
    console.log(token);
    console.log(content);
    return graphqlRequest(CREATE_TASK, {taskListId : taskListId, content : content}, token)
        .then(data => data.createTasks.tasks[0])
}

export function deleteTask(id, token) {
    return graphqlRequest(DELETE_TASK, {id}, token)
        .then(data => data.deleteTasks.nodesDeleted).catch(
            error => {
                console.log(error);
                throw error;
            }
        )
}

export function updateTask(id, content, done) {
    return graphqlRequest(UPDATE_TASK, {id, content, done})
        .then(data => data.updateTask.tasks[0])

}

export function switchTask(id, done, token) {
    return graphqlRequest(SWITCH_TASK, {id, done}, token)
        .then(data => data.updateTasks.tasks[0])
}

export function markAllTask(id, done, token) {
    return graphqlRequest(MARK_ALL_TASKS, {taskListId : id, done : done}, token)
        .then(data => data.updateTasks.tasks)
}

// Path: api/crudTaskList.js
