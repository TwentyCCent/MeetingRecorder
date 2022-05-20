import axios from 'axios';
import jwt_decode from 'jwt-decode';

class AuthService {

  jwt;
  connect;
  login;

  constructor() {
    this.jwt = localStorage.userToken ?? '';
    this.connect = localStorage.connect ?? '';
    this.login = localStorage.login ?? '';
  }

  register(login, email, pwd) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/auth/register', {
        login: login,
        email: email,
        password: pwd,
      }).then(function (response) {
        //console.log(response);
        resolve(response);
  
      }).catch(function (error) {
        console.log("data: " + error.response.data);
        console.log("status: " + error.response.status);
        reject(error.response);
        //console.log("headers: " + error.response.headers.content-type);
      })
    }
    )
  }


  async signin(email, pwd) {

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: pwd,
      })
      const decodedToken = jwt_decode(res.data);
      //console.table(decodedToken);
      //Structure objet jwt
      // sub, login, email, iat 
      this.connect = 1;

      return decodedToken;

    } catch (error) {
      //console.table(error);
      this.connect = 0;

      return error;

    }
  }
}

//myAuthService = new AuthService();
//Object.freeze(myAuthService);
export default new AuthService();