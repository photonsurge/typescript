import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { combineLatest, concat, defer, distinctUntilChanged, flatMap, fromEvent, map, Observable, of } from 'rxjs';

//https://medium.com/angular-in-depth/improve-performance-with-lazy-components-f3c5ff4597d2

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class VisibilityService {
  
  private pageVisible$: Observable<boolean>;
    
  constructor(@Inject(DOCUMENT) document: any) {
    this.pageVisible$ = concat(
      defer(() => of(!document.hidden)),
      fromEvent(document, 'visibilitychange')
        .pipe(
          map(e => !document.hidden)
        )
    );
  }
    
  elementInSight(element: ElementRef):Observable<boolean> {
  
    const elementVisible$:Observable<boolean> = Observable.create((observer:any) => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries);
      });
    
      intersectionObserver.observe(element.nativeElement);
    
      return () => { intersectionObserver.disconnect(); };
    
      })
      .pipe (
        flatMap((entries:any) => entries),
        map((entry:any) => entry.isIntersecting as boolean),
        distinctUntilChanged()
      );
    
      const elementInSight$ = combineLatest(
        this.pageVisible$,
        elementVisible$,
        (pageVisible, elementVisible) => pageVisible && elementVisible
      )
      .pipe (
        distinctUntilChanged()
      );      
    
      return elementInSight$;
  }
    
}