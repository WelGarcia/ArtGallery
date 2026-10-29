const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Artwork = sequelize.define('Artwork', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  imagePath: { type: DataTypes.STRING, allowNull: false },
  views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  likesCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  commentsCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
}, {
  timestamps: true,
  tableName: 'artworks',
  indexes: [{ fields: ['user_id'], name: 'idx_artworks_user_id' }]
});

module.exports = Artwork;
