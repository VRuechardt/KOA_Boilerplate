"use strict";

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING
    },{
        instanceMethods: {
            to_dict: function() {
                return {
                    id: this.id,
                    admin: this.admin,
                    email: this.email,
                    firstname: this.firstname,
                    lastname: this.lastname
                };
            }
        },
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return User;
};