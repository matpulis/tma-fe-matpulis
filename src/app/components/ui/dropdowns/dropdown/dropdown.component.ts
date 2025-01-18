import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        }),
        animate('200ms ease-in', style({
          opacity: 1,
          transform: 'scale(1)',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
        animate('200ms ease-out', style({
          opacity: 0,
          transform: 'scale(0.95)',
        }))
      ]),
    ]),
  ],
})
export class DropdownComponent {
  elRef = inject(ElementRef)

  isOpen = signal(false);

  // Toggle dropdown
  onToggleDropdown() {
    this.isOpen.update(isOpen => !isOpen);
  }

  // Listen for clicks outside of the dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
