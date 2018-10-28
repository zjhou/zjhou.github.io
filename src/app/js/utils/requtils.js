const graphQlQuery = async (endpoint, queryStr) => {
    const res = fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: queryStr})
    });

    const data = await res;
    return data.json();
};

export {graphQlQuery};