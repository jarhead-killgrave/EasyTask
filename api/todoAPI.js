const API_URL = 'http://192.168.56.101:4000'
const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

// Create a task
const CREATE_TASK =
    'mutation($id:ID!, $content:String!, $done:Boolean!){createTask(id:$id, content:$content, done:$done)}'

// Create a taskList
// A task list is a list of tasks that are associated to a user
const CREATE_TASK_LIST =
    'mutation($id:ID!, $title:String!, $tasks:[TaskInput]!, $userId:ID!){createTaskList(id:$id, title:$title, tasks:$tasks, userId:$userId)}'

// Get all the task lists of a user
const GET_TASK_LISTS =
    'query($userId:ID!){taskLists(userId:$userId){id, title, tasks{id, content, done}}}'
// Get a task list by its id
const GET_TASK_LIST =
    'query($id:ID!){taskList(id:$id){id, title, tasks{id, content, done}}}'


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
