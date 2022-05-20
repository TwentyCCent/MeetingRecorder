const authService = require("../services/authService");
const jwt = require('jsonwebtoken');

class AuthController {

    async register(request, response) {
        const data = request.body;
        const existingAccount = await authService.existAccount(data.email);
        if (existingAccount) {
            response.status(403).send("This email is already used")
        } else {
        const user = await authService.register(data.login, data.email, data.password);
        const payload = {
            sub: user.userId,
            email: user.email,
            login: user.login,
        }
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
        response.status(200).send(token);
    }
    }


    async login(request, response) {
        const data = request.body;
        const user = await authService.login(data.email, data.password);

        if (user !== undefined) {
            //user est ok je peux transmettre le jwt
            const payload = {
                sub: user.userId,
                email: user.email,
                login: user.login,
            }
            const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
            response.status(200).send(token);
        } else {
            // User est undefined
            response.status(403).send("The email or password is not correct");
        }
    }

    async deleteAccount(request, response) {
        await authService.delete(request.body.email);
        response.status(200).send();
    }

    async updateAccount(request, response) {
        await authService.update(request.body.login, request.body.email, request.body.password);
        response.status(200).send();
    }
}

module.exports = new AuthController();