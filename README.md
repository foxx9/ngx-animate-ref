# ngx-animate-ref

The goal of this project is to get for Angular2+ the same animation available for angularJS called animation anchoring:
https://docs.angularjs.org/api/ngAnimate#animation-anchoring-via-ng-animate-ref-

The effect is as an element is animating to its new position when navigating to an other page

### Demo project:

https://stackblitz.com/github/foxx9/ngx-animate-ref


## How to use

### Prerequisites

- You need to use Angular router for your routing

### Install

```
npm install --save ngx-animate-ref
```


### Add to your AppModule
````typescript
@NgModule({
 
  imports: [
    AnimateRefModule.forRoot({defaultTransition: '0.5s ease-in-out all', enableBlur: true}),
  ] 
})
export class AppModule { }

````

### Add [animateRef] directives on elements that will be animated
 
Give them a unique identifier shared across pages as the value, the library will do the rest.

#### Example
Element in page A :

````html
<div [animateRef]="'myText'" style="background: blue">Hello there</div>
````

Element in page B :

````html
<div [animateRef]="'myText'" style="background: red"> Hello there</div>
````



## Tips for better results

- Directive should be placed on elements without margin, so you should wrap them if they have one
- Wrap images in divs



