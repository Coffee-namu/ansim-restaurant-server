/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return review.init(sequelize, DataTypes);
}

class review extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    review_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    restaurant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'restaurant',
        key: 'restaurant_id'
      }
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      }
    },
    score: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'review',
    schema: 'ansim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "score",
        using: "BTREE",
        fields: [
          { name: "score" },
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
        name: "restaurant_id",
        using: "BTREE",
        fields: [
          { name: "restaurant_id" },
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
  return review;
  }
}
