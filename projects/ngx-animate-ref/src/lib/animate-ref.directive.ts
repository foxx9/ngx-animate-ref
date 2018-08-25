import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {AnimateRefService} from './animate-ref.service';


export interface AnimateMetaData {
  position: ClientRect;
  styles: { [key: string]: any };
}

@Directive({
  selector: '[animateRef]'
})
export class AnimateRefDirective implements AfterViewInit {


  @Input() animateRef: string;
  @Input() transition: string;

  public lifetime = 2;
  public cycle: number;
  public metaData: AnimateMetaData = null;
  public clone: HTMLElement = null;

  constructor(private service: AnimateRefService, public el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.service.register(this);
  }

  createMetaData() {
    this.metaData = {
      position: this.el.nativeElement.getBoundingClientRect(),
      styles: {}
    };

    const cssStyleDeclaration = window.getComputedStyle(this.el.nativeElement);
    const stylesLength = cssStyleDeclaration.length;
    for (let i = 0; i < stylesLength; i++) {
      const style = cssStyleDeclaration[i];
      if (style.match(/color|font|text|size/)) {
        this.metaData.styles[style] = cssStyleDeclaration.getPropertyValue(style);
      }
    }
  }

  createClone() {
    this.clone = this.el.nativeElement.cloneNode(true);
  }

  getNativeElement(): HTMLElement {
    return this.el.nativeElement;
  }


}
