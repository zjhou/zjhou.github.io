const req = async (url, method, data) => {
    return (await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    })).json();
};

const graphQlQuery = (endpoint, queryStr) => req(endpoint, 'POST', {query: queryStr});

export {graphQlQuery, req};