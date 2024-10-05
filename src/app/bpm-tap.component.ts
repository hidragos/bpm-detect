import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'bpm-tap',
  template: `
    <div class="gradient-overlay" [class.blink]="isBlinking"></div>
    <div class="container" (click)="tap()">
      <span class="label">{{ bpm }}</span>

      <button
        data="Reset"
        class="reset-btn"
        (click)="reset($event)"
        aria-label="Reset Counter"
      ></button>
    </div>
  `,
  styles: [
    `
      /* Container Styling */
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        height: 100%;
        user-select: none; /* Prevent text selection */
        overflow: hidden;
        align-content: center; /* Center content vertically */
      }

      /* Funky BPM Display Styling */
      .label {
        font-size: clamp(20dvw, 50vw, 50dvh);
        margin: 16px;
        width: 100vw;
        flex-grow: 1;
        font-weight: 700;
        background: linear-gradient(270deg, #00ffa3, #dc1fff, #00ffa3);
        background-size: 600% 600%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientAnimation 10s ease infinite;
        z-index: 2; /* Ensure content is above gradient overlay */
        flex-grow: 1; /* Fill remaining space */
        align-content: center; /* Center content vertically */
        font-family: 'Nabla', Arial, sans-serif; /* Optional: Set a default font */
      }

      /* Gradient Animation for BPM Display */
      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      /* New Button Styling */
      .reset-btn {
        font-family: Poppins;
        position: relative;
        padding: 15px 50px;
        border: none;
        outline: none;
        border-radius: 16px;
        background: linear-gradient(to right, #00ffa3, #dc1fff);
        cursor: pointer;
        z-index: 2; /* Create a new stacking context */
        background-color: transparent; /* Ensure no background color */
        color: transparent; /* Hide default button text */
        margin-bottom: 16px;
        overflow: hidden; /* Hide overflow for pulse animation */
      }

      .reset-btn::before {
        content: '';
        position: absolute;
        top: 1px;
        right: 1px;
        bottom: 1px;
        left: 1px;
        border-radius: 16px; /* R1 - D = 5px - 1px = 4px */
        background-color: #3ffbd6; /* Match container's background color */
        z-index: -1; /* Place behind the button content */
        transition: opacity 200ms, top 200ms, right 200ms, bottom 200ms,
          left 200ms;
        opacity: 1;
      }

      .reset-btn::after {
        content: attr(data);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        font-weight: bold;
        background: linear-gradient(to left, #00ffa3, #dc1fff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: color 200ms, background 200ms;
        z-index: 2; /* Ensure text is above ::before */
        pointer-events: none; /* Allow clicks to pass through */
      }

      /* Hover Effects */
      .reset-btn:hover::before {
        opacity: 0.5;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
      }

      /* On Click Effect */
      .reset-btn:active::before {
        display: none;
      }

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
        transition: opacity 200ms ease-in-out; /* Faster transition */
        z-index: 1; /* Ensure overlay is below content */
      }

      /* Blink Animation */
      .blink {
        animation: blinkAnimation 200ms ease-in-out;
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
    `,
  ],
})
export class BpmTapComponent {
  tapTimes: number[] = [];
  bpm = 0;

  isBlinking = false;

  constructor() {
    // Listen for spacebar presses
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar scrolling
        this.tap();
      }
    });
  }

  /**
   * Handles tap/click events to calculate BPM and trigger blink animation.
   */
  tap(): void {
    const currentTime = Date.now();
    this.tapTimes.push(currentTime);

    if (this.tapTimes.length > 1) {
      const intervals = this.tapTimes
        .slice(1)
        .map((time, index) => time - this.tapTimes[index]);
      const averageInterval =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
      this.bpm = Math.round(60000 / averageInterval);
    }

    this.triggerBlink();
  }

  /**
   * Resets the BPM data.
   * @param event MouseEvent to stop propagation.
   */
  reset(event: MouseEvent): void {
    event.stopPropagation();
    this.tapTimes = [];
    this.bpm = 0;
  }

  /**
   * Triggers the blink animation by toggling the 'isBlinking' flag.
   */
  triggerBlink(): void {
    this.isBlinking = true;
    // Remove the blink class after the animation duration (200ms)
    setTimeout(() => {
      this.isBlinking = false;
    }, 200);
  }
}
