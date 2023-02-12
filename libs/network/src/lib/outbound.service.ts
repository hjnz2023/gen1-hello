import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { z } from 'zod';

import { IfConfigResult, IfConfigResultType } from './models';

@Injectable({
  providedIn: 'root',
})
export class OutboundService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IfConfigResultType> {
    return this.http.get('https://ifconfig.me/all.json').pipe(
      map((res) => {
        return IfConfigResult.parse(res);
      })
    );
  }
}
