// Fontion qui retourne les options 
export const headerFetch = (protocol) => {
    const myHeaders = new Headers();
    const options = {
        method: protocol,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    return options;
}