import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UlListComponent, UlListElement } from './ul-list/ul-list.component';

type HeadingElement = {
  parent: HeadingElement | null;
  children: HeadingElement[];
  text: string;
  level: number;
  element: Element;
  highlighted: boolean;
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

  clearHighlight(headings: UlListElement[]): UlListElement[] {
    return headings.map((heading) => {
      return {
        ...heading,
        highlighted: false,
        children: this.clearHighlight(heading.children),
      };
    });
  }

  getElementScrollPair({
    acc = [],
    headings,
  }: {
    headings: UlListElement[];
    acc?: { element: Element; scroll: number }[];
  }): { element: Element; scroll: number }[] {
    if (headings.length === 0) return acc;

    headings.forEach((heading) => {
      const rect = heading.element.getBoundingClientRect();
      if (rect.y > 0) {
        return;
      }

      acc.push({ element: heading.element, scroll: rect.y });
      if (heading.children.length > 0) {
        this.getElementScrollPair({ headings: heading.children, acc });
      }
    });

    return acc;
  }

  highlightElement({
    element,
    headings,
  }: {
    headings: UlListElement[];
    element: Element;
  }) {
    headings.forEach((heading) => {
      if (heading.element === element) {
        heading.highlighted = true;
        return;
      }

      if (heading.children.length > 0) {
        this.highlightElement({ element, headings: heading.children });
      }
    });
  }

  getClosestMatch() {
    let scrollPair = [];

    try {
      scrollPair = this.getElementScrollPair({ headings: this.headings });
    } catch (error) {
      scrollPair = [{ scroll: 0, element: this.headings[0].element }];
    }

    return scrollPair.sort((a, b) => a.scroll - b.scroll).reverse()[0];
  }

  @HostListener('window:scroll', ['$event']) scrollTracker(event: Event) {
    this.headings = this.clearHighlight(this.headings);

    const closestMatch = this.getClosestMatch();

    if (closestMatch) {
      this.highlightElement({
        element: closestMatch.element,
        headings: this.headings,
      });
    }
  }

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
      element: headings[0],
      highlighted: false,
    };
    elements.push(previous);

    headings.slice(1).forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent ?? '';

      const node: HeadingElement = {
        parent: null,
        children: [],
        text,
        level,
        element: heading,
        highlighted: false,
      };

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

    console.log(
      'this.querySelector',
      document.querySelector(this.querySelector)
    );
  }
}
