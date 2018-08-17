import {InjectionToken} from '@angular/core';


export interface AnimateRefConfig {
  defaultTransition: string;
  enableBlur?: boolean;
}

export const ANIMATE_REF_CONFIG = new InjectionToken<AnimateRefConfig>('animateRefConfig');
