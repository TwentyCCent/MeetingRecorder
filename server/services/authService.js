const User = require('../data/models/user')

class AuthService {

    async register(login, email, password) {
        const user = await User.create({
            login: login,
            email: email,
            password: password
        });
        return user;
    }

    async login(email, password) {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const pwdMatched = await user.verifyPwd(password);
            if (pwdMatched) {
                return user;
            } else {
                return undefined;
            }
        } else {
            return undefined;
            // Traitement de requete dont le mail n'est pas enregistré
        }
    }

    async update(login, email, password) {
        const user = await User.update({
            email: email,
        },
            {
                login: login,
                email: email,
                password: password
            });
        return user;
    }

    async delete(email) {
        const user = await User.destroy({
            where: {
                email: email
            }
        });
        return user;
    }

    async existAccount(email) {
        return await User.findOne({
            where: {
                email: email
            }
        });
    }
}

module.exports = new AuthService();