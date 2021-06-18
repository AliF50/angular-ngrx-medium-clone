import {ProfileInterface} from './profile.interface';
import {PopularTagType} from './popularTag.type';
export interface ArticleInterface {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updateAt: string;
  tagList: PopularTagType[];
  description: string;
  author: ProfileInterface;
  favorited: boolean;
  favoritesCount: number;
}
