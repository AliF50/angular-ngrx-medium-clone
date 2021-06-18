import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserProfileInterface} from '../types/userProfile.interface';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GetUserProfileResponseInterface} from '../types/getUserProfileResponse.interface';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}
  getUserProfile(slug: string | null): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;

    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
