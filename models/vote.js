/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return vote.init(sequelize, DataTypes);
}

class vote extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    vote_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      }
    },
    review_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'review',
        key: 'review_id'
      }
    },
    document_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'document',
        key: 'document_id'
      }
    },
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'comment',
        key: 'comment_id'
      }
    },
    type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'vote',
    schema: 'ansim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vote_id" },
        ]
      },
      {
        name: "member_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
          { name: "review_id" },
        ]
      },
      {
        name: "member_id_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
          { name: "document_id" },
        ]
      },
      {
        name: "member_id_3",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
          { name: "comment_id" },
        ]
      },
      {
        name: "member_id_4",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "review_id",
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "document_id",
        using: "BTREE",
        fields: [
          { name: "document_id" },
        ]
      },
      {
        name: "comment_id",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "type",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "created",
        using: "BTREE",
        fields: [
          { name: "created" },
        ]
      },
    ]
  });
  return vote;
  }
}
