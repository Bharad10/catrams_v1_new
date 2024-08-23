import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableArrowKeys], input[type="number"]'
})
export class DisableArrowKeysDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
}
