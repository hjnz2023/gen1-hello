import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OutboundInfo } from './models';

@Injectable({
  providedIn: 'root'
})
export class OutboundService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<OutboundInfo>('https://ifconfig.me/all.json');
  }
}
