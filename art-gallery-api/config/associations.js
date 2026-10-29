const User = require('../modules/user/userModel');
const Artwork = require('../modules/artwork/artworkModel');
const Like = require('../modules/like/likeModel');
const Comment = require('../modules/comment/commentModel');

User.hasMany(Artwork, { foreignKey: 'userId' });
Artwork.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Artwork.hasMany(Like, { foreignKey: 'artworkId' });
Like.belongsTo(Artwork, { foreignKey: 'artworkId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Artwork.hasMany(Comment, { foreignKey: 'artworkId' });
Comment.belongsTo(Artwork, { foreignKey: 'artworkId' });
