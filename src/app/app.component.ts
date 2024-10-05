import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BpmTapComponent } from './bpm-tap.component';
import { SvgIconComponent } from './svg-icon.component';

@Component({
  standalone: true,
  imports: [CommonModule, BpmTapComponent, SvgIconComponent],
  selector: 'app-root',
  template: `
    <div class="header">
      <h2>click or press space to start counting</h2>
    </div>
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

      .header {
        font-family: 'Poppins';
        position: absolute;
        margin: 0 auto;
        opacity: 0.1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 36px;
        z-index: 2;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {}
