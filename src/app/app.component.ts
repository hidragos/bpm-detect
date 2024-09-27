import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BpmDetectComponent } from './bpm-detect.component';

@Component({
  standalone: true,
  imports: [CommonModule, BpmDetectComponent],
  selector: 'app-root',
  template: `
    <!-- Gradient Overlay -->
    <div class="gradient-overlay" [class.blink]="isBlinking"></div>
    <bpm-detect [(isBlinking)]="isBlinking"></bpm-detect>
    <div class="footer">made with 💝 at github</div>
  `,
  styles: [
    `
      .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: radial-gradient(
          circle,
          rgba(63, 173, 252, 1) 0%,
          rgba(70, 208, 252, 1) 100%
        );
        opacity: 0;
        pointer-events: none; /* Allow clicks to pass through */
        transition: opacity 150ms ease-in-out; /* Faster transition */
        z-index: 1; /* Ensure overlay is below content */
      }

      /* Blink Animation */
      .blink {
        animation: blinkAnimation 150ms ease-in-out;
      }

      @keyframes blinkAnimation {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      .footer {
        position: absolute;
        right: 4px;
        bottom: 4px;
        font-family: monospace;
        color: #fb3ff1;
      }
    `,
  ],
})
export class AppComponent {
  isBlinking = false;
}
