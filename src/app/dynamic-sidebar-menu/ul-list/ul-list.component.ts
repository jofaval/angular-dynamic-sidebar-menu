import { Component, Input } from '@angular/core';

export type UlListElement = {
  text: string;
  children: UlListElement[];
  element: Element;
  highlighted: boolean;
};

@Component({
  selector: 'app-ul-list',
  imports: [],
  templateUrl: './ul-list.component.html',
  styleUrl: './ul-list.component.scss'
})
export class UlListComponent {
  @Input() elements: UlListElement[] = [];
}
