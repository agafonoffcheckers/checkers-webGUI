/**
 * @APIRequest class
 * Includes "GET" and "POST" methods
 * TODO - make timeout for requests
 * */

export class APIRequest {
    static async GET(url) {
        let props = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(url, props);
        if(!response.ok) {
            throw new Error(`Can't GET ${url}, with status: ${response.status}`)
        }

        return await response.json();
    }
    static async POST(url = '', data = {}) {
        let props = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, props);
        if(!response.ok) {
            throw new Error(`Can't POST ${url}, with status: ${response.status}`)
        }
        return await response.json();
    }
}