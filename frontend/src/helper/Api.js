class Api {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8080/api';
        this.jwtKey = "jwtKey";
        this.headers = {
            // Authorization: `Bearer ${this.jwtKey}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }

    fetchData(path) {
        const url = `${this.baseUrl}${path}`;
        console.log(url);
        return fetch(url, {
            method: 'GET',
            headers: this.headers,
        }).then(this.handleResponse);
    }

    postData(path, data) {
        const url = `${this.baseUrl}${path}`;
        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this.handlePostResponse);
    }

    putData(path, data) {
        const url = `${this.baseUrl}${path}`;
        return fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this.handleResponse);
    }

    deleteData(path) {
        const url = `${this.baseUrl}${path}`;
        return fetch(url, {
            method: 'DELETE',
            headers: this.headers,
        }).then(this.handleResponse);
    }

    handlePostResponse(response) {
        if (!response.ok) {
            throw new Error('Server not responding');
        }
        return response.json();
    }

    handleResponse(response) {
        if (!response.ok) {
            return response.json();
            throw new Error('Server not responding');
        }
        return response.json();
    }
}

export default Api;
