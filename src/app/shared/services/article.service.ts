import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {ArticleInterface} from '../types/article.interface';
import {map} from 'rxjs/operators';
import {GetArticleResponseInterface} from '../types/getArticleResponseInterface';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string | null): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .get<GetArticleResponseInterface>(fullUrl)
      .pipe(map((response: GetArticleResponseInterface) => response.article));
  }
}
