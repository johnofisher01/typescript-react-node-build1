import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Article extends Model {}

Article.init({
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  content: DataTypes.TEXT,
  views: DataTypes.INTEGER,
  shares: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'Articles', // use your actual table name
  timestamps: true,
});

export default Article;
