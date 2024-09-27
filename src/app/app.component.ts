import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BpmTapComponent } from './bpm-tap.component';
import { SvgIconComponent } from './svg-icon.component';

@Component({
  standalone: true,
  imports: [CommonModule, BpmTapComponent, SvgIconComponent],
  selector: 'app-root',
  template: `
    <bpm-tap></bpm-tap>
    <a
      class="footer"
      href="https://github.com/hidragos/bpm-tap"
      target="_blank"
    >
      <app-svg-icon [src]="'./github.svg'"></app-svg-icon>
    </a>
  `,
  styles: [
    `
      .footer {
        position: absolute;
        bottom: 0px;
        right: 0px;
        padding: 2px;
        z-index: 4;
      }
    `,
  ],
})
export class AppComponent {}
