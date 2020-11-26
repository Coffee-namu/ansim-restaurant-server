var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _comment = require("./comment");
var _document = require("./document");
var _document_category = require("./document_category");
var _member = require("./member");
var _restaurant = require("./restaurant");
var _restaurant_category = require("./restaurant_category");
var _review = require("./review");
var _vote = require("./vote");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var document = _document(sequelize, DataTypes);
  var document_category = _document_category(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var restaurant = _restaurant(sequelize, DataTypes);
  var restaurant_category = _restaurant_category(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var vote = _vote(sequelize, DataTypes);

  comment.belongsTo(comment, { foreignKey: "parent_id"});
  comment.hasMany(comment, { foreignKey: "parent_id"});
  comment.belongsTo(member, { foreignKey: "member_id"});
  member.hasMany(comment, { foreignKey: "member_id"});
  comment.belongsTo(review, { foreignKey: "review_id"});
  review.hasMany(comment, { foreignKey: "review_id"});
  comment.belongsTo(document, { foreignKey: "document_id"});
  document.hasMany(comment, { foreignKey: "document_id"});
  document.belongsTo(board, { foreignKey: "board_id"});
  board.hasMany(document, { foreignKey: "board_id"});
  document.belongsTo(document_category, { foreignKey: "category_id"});
  document_category.hasMany(document, { foreignKey: "category_id"});
  document.belongsTo(member, { foreignKey: "member_id"});
  member.hasMany(document, { foreignKey: "member_id"});
  document_category.belongsTo(document_category, { foreignKey: "parent_id"});
  document_category.hasMany(document_category, { foreignKey: "parent_id"});
  document_category.belongsTo(board, { foreignKey: "board_id"});
  board.hasMany(document_category, { foreignKey: "board_id"});
  restaurant.belongsTo(restaurant_category, { foreignKey: "category_id"});
  restaurant_category.hasMany(restaurant, { foreignKey: "category_id"});
  restaurant.belongsTo(member, { foreignKey: "member_id"});
  member.hasMany(restaurant, { foreignKey: "member_id"});
  restaurant_category.belongsTo(restaurant_category, { foreignKey: "parent_id"});
  restaurant_category.hasMany(restaurant_category, { foreignKey: "parent_id"});
  review.belongsTo(restaurant, { foreignKey: "restaurant_id"});
  restaurant.hasMany(review, { foreignKey: "restaurant_id"});
  review.belongsTo(member, { foreignKey: "member_id"});
  member.hasMany(review, { foreignKey: "member_id"});
  vote.belongsTo(member, { foreignKey: "member_id"});
  member.hasMany(vote, { foreignKey: "member_id"});
  vote.belongsTo(review, { foreignKey: "review_id"});
  review.hasMany(vote, { foreignKey: "review_id"});
  vote.belongsTo(document, { foreignKey: "document_id"});
  document.hasMany(vote, { foreignKey: "document_id"});
  vote.belongsTo(comment, { foreignKey: "comment_id"});
  comment.hasMany(vote, { foreignKey: "comment_id"});

  return {
    board,
    comment,
    document,
    document_category,
    member,
    restaurant,
    restaurant_category,
    review,
    vote,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
