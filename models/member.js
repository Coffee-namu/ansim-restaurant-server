/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return member.init(sequelize, DataTypes);
}

class member extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    member_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp')
    },
    is_admin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    is_owner: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    is_customer: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'member',
    schema: 'ansim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "created",
        using: "BTREE",
        fields: [
          { name: "created" },
        ]
      },
      {
        name: "is_admin",
        using: "BTREE",
        fields: [
          { name: "is_admin" },
        ]
      },
      {
        name: "is_owner",
        using: "BTREE",
        fields: [
          { name: "is_owner" },
        ]
      },
      {
        name: "is_customer",
        using: "BTREE",
        fields: [
          { name: "is_customer" },
        ]
      },
    ]
  });
  return member;
  }
}
