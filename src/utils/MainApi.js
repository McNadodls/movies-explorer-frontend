class MainApi {
  constructor(baseUrl){
      this._baseUrl = baseUrl;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  _enterError (err) {
    Promise.reject(`Ошибка: ${err.status}`);
  }
  
//ПОЛЬЗОВАТЕЛЬ
  getCurentUser () {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(res => this._checkResponse(res))
  }

  signup(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
    .then(res => this._checkResponse(res))
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json" 
      },
      credentials: 'include',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(res => this._checkResponse(res))
  }

  updateUser(name, email) {
    console.log(name, email)
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        "name": name,
        "email": email
      })
    })
    .then(res => this._checkResponse(res))
  }

  logout () {
		return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then(res => this._checkResponse(res))
  }

//Фильмы
  getSavedMovie () {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(this._checkResponse)
  }

  saveMovie (movieInfo) {
    const {country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN} = movieInfo;
    console.log({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
      return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
    })
    .then(this._checkResponse)
  }
    
  deleteSavedMovie (id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => this._checkResponse(res))
  }
}

export default new MainApi("https://api.mcnad.movie.nomoredomains.club");