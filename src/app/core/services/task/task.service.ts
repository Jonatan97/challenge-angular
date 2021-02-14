
import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base-service.service';
@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseService<any>{
  public baseUrl: string;

  constructor(@Inject(HttpClient) http) {
      
    const baseURl = environment.apiBaseUrl +"dbchallenges";
    super(baseURl, http);
    this.baseUrl = baseURl;
  }
}
