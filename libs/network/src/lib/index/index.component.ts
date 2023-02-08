import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOutboundAddress } from '../outbound/outbound.selectors';
@Component({
  selector: 'gen1-hello-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  private store = inject(Store);
  readonly address$ = this.store.select(selectOutboundAddress);
}
