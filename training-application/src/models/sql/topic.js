const Sequelize = require("sequelize");

module.exports = sequelize.define("tbl_topics", {
    topic_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  topic_name: Sequelize.STRING(250),
  is_active:Sequelize.BOOLEAN
});