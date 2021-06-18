import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleInputInterface} from '../../shared/types/articleInput.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {SaveArticleResponseInterface} from '../../shared/types/saveArticleResponse.interface';
import {ArticleInterface} from '../../shared/types/article.interface';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';
    return this.http
      .post<SaveArticleResponseInterface>(fullUrl, articleInput)
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
