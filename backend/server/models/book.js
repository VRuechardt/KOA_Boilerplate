"use strict";

module.exports = function(sequelize, DataTypes) {
    let Book = sequelize.define("Book", {
        title: DataTypes.STRING,
        author: DataTypes.STRING
    },{
        instanceMethods: {
            to_dict: function() {
                return {
                    id: this.id,
                    title: this.title,
                    author: this.author
                };
            }
        }
    });
    return Book;
};