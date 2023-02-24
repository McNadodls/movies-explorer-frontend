class MoviesApi {
    constructor(baseUrl){
        this._baseUrl = baseUrl;
        this.newArr = [];
    }

    _getResponseData(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      }

    getMovies () { 
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => this._getResponseData(res))
    }
}

export default new MoviesApi("https://api.nomoreparties.co/beatfilm-movies");