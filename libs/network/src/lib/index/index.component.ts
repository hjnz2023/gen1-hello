import { Component } from '@angular/core';
import { map } from 'rxjs';
import { OutboundService } from '../outbound.service';

@Component({
  selector: 'gen1-hello-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {

  constructor(private outbound: OutboundService) {
  }

  all$ = this.outbound.getAll().pipe(map(e => e.ip_addr));
}
