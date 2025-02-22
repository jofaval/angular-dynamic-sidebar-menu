import { Component, Input, OnInit } from '@angular/core';
import { UlListComponent, UlListElement } from './ul-list/ul-list.component';

type HeadingElement = {
  parent: HeadingElement | null;
  children: HeadingElement[];
  text: string;
  level: number;
};

@Component({
  selector: 'app-dynamic-sidebar-menu',
  imports: [UlListComponent],
  templateUrl: './dynamic-sidebar-menu.component.html',
  styleUrl: './dynamic-sidebar-menu.component.scss',
})
export class DynamicSidebarMenuComponent implements OnInit {
  @Input() querySelector = 'main';
  loading = true;
  headings: UlListElement[] = [];

  generate() {
    const element = document.querySelector(this.querySelector);
    if (element === null) return;

    this.loading = true;

    const headings = Array.from(
      element.querySelectorAll(
        'h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6'
      )
    );

    const elements: HeadingElement[] = [];
    let previous: HeadingElement = {
      parent: null,
      children: [],
      text: headings[0].textContent ?? '',
      level: parseInt(headings[0].tagName[1]),
    };
    elements.push(previous);

    headings.slice(1).forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent ?? '';

      const node: HeadingElement = { parent: null, children: [], text, level };

      if (previous.level < node.level) {
        node.parent = previous;
        previous.children.push(node);
      } else if (previous.level === node.level) {
        node.parent = previous.parent;
        previous.parent?.children.push(node);
      } else if (node.level === 1) {
        node.parent = null;
        elements.push(node);
      } else {
        while (previous.level >= node.level && previous.parent !== null) {
          previous = previous.parent;
        }

        if (previous !== null) {
          node.parent = previous;
          previous.children.push(node);
        }
      }

      previous = node;
    });

    this.headings = elements;
    console.log({ headings, result: this.headings, elements });
    this.loading = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.generate();
    }, 1_000);
  }
}
