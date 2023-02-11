import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIp_addr } from '../outbound/outbound.reducer';
@Component({
  standalone: true,
  selector: 'gen1-hello-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [CommonModule],
})
export class IndexComponent {
  private store = inject(Store);
  readonly address$ = this.store.select(selectIp_addr);
}
