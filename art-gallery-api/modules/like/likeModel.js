const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Like = sequelize.define('Like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  artworkId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'artworks', key: 'id' } }
}, {
  timestamps: true,
  tableName: 'likes',
  // A unicidade pertence ao PAR (usuário, obra), nunca às colunas individualmente.
  indexes: [{ unique: true, fields: ['user_id', 'artwork_id'], name: 'idx_unique_like' }]
});

module.exports = Like;
