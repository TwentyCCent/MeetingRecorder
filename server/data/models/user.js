const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {

    // sequelize est l'instance
    static async init(sequelizeInstance) {
        super.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },

            {
                // Hachage du mdp
                hooks: {
                    beforeCreate: async (user, options) => {

                        const hashedPwd = await bcrypt.hash(user.password, 10);
                        user.password = hashedPwd;
                    }
                },
                sequelize: sequelizeInstance,
                //nom de la table
                modelName: 'User',
                // option colonne date de création et de maj
                createdAt: true,
                updatedAt: true,

            })
        super.sync();
    }

    async verifyPwd(clearPassword) {
        return await bcrypt.compare(clearPassword, this.password);
    }
}

module.exports = User;