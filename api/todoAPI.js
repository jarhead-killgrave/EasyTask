//const API_URL = 'http://192.168.56.101:4000'


const API_URL = 'http://localhost:4000'

/**
 * graphqlRequest is a function that sends a GraphQL query to a server and returns the data.
 *
 * @param {string} query - The GraphQL query to send to the server.
 * @param {Object} variables - The variables to include in the query.
 * @param {string} token - The authentication token to include in the request headers.
 */
export const graphqlRequest = (query, variables, token = "") => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query, variables }),
  })
      .then(response => response.json())
      .then(response => {
        if (response.errors != null) {
          throw new Error(response.errors[0].message);
        }
        return response.data;
      });
};

/**
 * callApiUpdateState is a function that calls an API and updates the state of a React component with the response.
 *
 * @param {function} apiCall The function to call to retrieve the data from the API.
 *                             This function should return a promise that resolves with the response data.
 * @param {function} setStateFunction The function to call to update the state of the React component.
 *                                      This function should accept the response data as its argument.
 * @param {...*} args Additional arguments to pass to the apiCall function.
 *                     These arguments should match the parameters expected by the apiCall function.
 */
export const callApiUpdateState = async (apiCall, setStateFunction, ...args) => {
    try {
        // Call the provided apiCall function with the provided arguments and wait for the response
        const response = await apiCall(...args);

        // Call the provided setStateFunction with the response data to update the state of the React component
        setStateFunction(response);
    } catch (error) {


    }
};

