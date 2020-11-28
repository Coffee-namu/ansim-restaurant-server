/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return restaurant.init(sequelize, DataTypes);
}

class restaurant extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    restaurant_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'restaurant_category',
        key: 'category_id'
      }
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'member',
        key: 'member_id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    geolocation_x: {
      type: DataTypes.DECIMAL(13,10),
      allowNull: true
    },
    geolocation_y: {
      type: DataTypes.DECIMAL(13,10),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    api_code_mafra: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "api_code_mafra"
    },
    api_code_gg: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "api_code_gg"
    },
    is_trusty: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'restaurant',
    schema: 'ansim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "restaurant_id" },
        ]
      },
      {
        name: "api_code_mafra",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "api_code_mafra" },
        ]
      },
      {
        name: "api_code_gg",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "api_code_gg" },
        ]
      },
      {
        name: "name",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "geolocation_x",
        using: "BTREE",
        fields: [
          { name: "geolocation_x" },
        ]
      },
      {
        name: "geolocation_y",
        using: "BTREE",
        fields: [
          { name: "geolocation_y" },
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
        name: "category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  return restaurant;
  }
}
