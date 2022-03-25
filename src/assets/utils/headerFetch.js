// Fontion qui retourne les options 
export const headerFetch = (protocol, body) => {
    const myHeaders = new Headers();
    if (protocol === 'POST') {
        const options = {
            method: protocol,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body),
        };
        return options;
    };

    if (protocol === 'GET') {
        const options = {
            method: protocol,
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        };
        return options;
    }
}