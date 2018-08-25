import {Inject, Injectable} from '@angular/core';
import {ResolveEnd, Router} from '@angular/router';
import {AnimateMetaData, AnimateRefDirective} from './animate-ref.directive';
import {ANIMATE_REF_CONFIG, AnimateRefConfig} from './animate-ref.config';

@Injectable()
export class AnimateRefService {

  refs: AnimateRefDirective[] = [];
  currentCycle = 0;

  private transitionEndEvents = ['transitionend', 'oTransitionend', 'webkitTransitionEnd'];

  constructor(private router: Router, @Inject(ANIMATE_REF_CONFIG) private config: AnimateRefConfig) {

    router.events.subscribe(event => {
      if (event instanceof ResolveEnd) {
        this.onRouteWillChange();
        this.currentCycle++;
      }
    });
  }


  processMatch(newRef: AnimateRefDirective) {

    const match = this.refs.find(r =>
      r !== newRef &&
      r.cycle < newRef.cycle &&
      r.animateRef === newRef.animateRef);

    if (match) {
      newRef.createMetaData();
      this.animate(match.clone, match, newRef);
    }

  }

  onRouteWillChange() {
    // remove refs that are too old
    this.refs = this.refs
      .map(r => {
        r.lifetime--;
        if (r.lifetime === 0) {
          r.clone = null;
          r.el.nativeElement = null;
        }
        return r;
      })
      .filter(r => r.lifetime > 0);

    this.refs
      .forEach(r => {
        if (!r.clone) {
          r.createClone();
          r.createMetaData();
        }
      });
  }

  register(newRef: AnimateRefDirective) {
    newRef.cycle = this.currentCycle;

    const oldVersion = this.refs.find(r =>
      r.cycle === newRef.cycle &&
      r.animateRef === newRef.animateRef);


    if (oldVersion) {
      this.refs = this.refs.filter(r => r !== oldVersion);
    }

    this.refs.push(newRef);
    this.processMatch(newRef);
  }


  private animate(clone: HTMLElement, source: AnimateRefDirective, destination: AnimateRefDirective) {

    const destinationElement = destination.getNativeElement();
    const originalOpacity = destinationElement.style.opacity;

    // hide destination
    destinationElement.style.opacity = '0';
    this.applyMetaDataStyles(clone, source.metaData);
    this.displayClone(clone);
    clone.style.transition = source.transition || this.config.defaultTransition;
    clone.classList.add('clone');

    // tick to let css3 transition happen
    setTimeout(() => {
      this.applyMetaDataStyles(clone, destination.metaData);
      const that = this;
      this.attachTransitionEndListener(clone, function () {
        // remove clone and show destination element
        destinationElement.style.opacity = originalOpacity;
        that.detachTransitionEndListener.call(that, clone, this);
        that.removeClone(clone);
      });
    });
  }

  displayClone(clone: HTMLElement) {
    document.body.appendChild(clone);
  }

  removeClone(clone: HTMLElement) {
    const parentNode = clone.parentNode;
    if (parentNode) {
      parentNode.removeChild(clone);
    }
  }

  applyMetaDataStyles(element: HTMLElement, data: AnimateMetaData) {

    // basic styles
    for (const prop in data.styles) {
      if (data.styles.hasOwnProperty(prop)) {
        element.style[prop] = data.styles[prop];
      }
    }

    // position styles
    element.style.top = data.position.top + 'px';
    element.style.left = data.position.left + 'px';
    element.style.bottom = data.position.bottom + 'px';
    element.style.right = data.position.right + 'px';
    element.style.width = data.position.width + 'px';
    element.style.height = data.position.height + 'px';

    // necessary overrides
    element.style.position = 'fixed';
    element.style.margin = '0';
    element.style.padding = '0';
    element.style.border = '0';
    element.style.outline = '0';
    element.style.pointerEvents = 'none';
    element.style.overflow = 'visible';


    // optional
    if (this.config.enableBlur) {
      element.style.filter = 'blur(2px)';
    }

  }


  attachTransitionEndListener(element: HTMLElement, fn: EventListener) {
    this.transitionEndEvents
      .forEach(ev => element.addEventListener(ev, fn));
  }

  detachTransitionEndListener(element, fn: EventListener) {
    this.transitionEndEvents
      .forEach(ev => element.removeEventListener(ev, fn));
  }
}
