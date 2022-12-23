//const API_URL = 'http://192.168.56.101:4000'


const API_URL = 'http://localhost:4000'

/**
 * graphqlRequest is a function that sends a GraphQL query to a server and returns the data.
 *
 * @param {string} query - The GraphQL query to send to the server.
 * @param {Object} variables - The variables to include in the query.
 * @param {string} token - The authentication token to include in the request headers.
 * @return {Promise<Object>} - A promise that resolves to the data returned by the server.
 * @throws {Error} - If an error occurs while making the request or parsing the response.
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
        body: JSON.stringify({query, variables}),
    })
        .then(response => response.json())
        .then(response => {
            if (response.errors != null) {
                throw new Error(response.errors[0].message);
            }
            return response.data;
        });
};
