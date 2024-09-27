import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: `
    <!-- <img [src]="src" /> -->
    <svg
      [attr.fill]="color"
      [attr.src]="src"
      [attr.width]="width"
      [attr.height]="height"
      [innerHTML]="svgContent"
    ></svg>
  `,
  standalone: true,
})
export class SvgIconComponent {
  @Input() src!: string;
  @Input() color: string = '#000000';
  @Input() width: number = 16;
  @Input() height: number = 16;

  sanitizer = inject(DomSanitizer);

  svgContent: SafeHtml = '';

  ngOnChanges(): void {
    if (this.src) {
      fetch(this.src)
        .then((response) => response.text())
        .then((svg) => {
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        });
    }
  }
}
