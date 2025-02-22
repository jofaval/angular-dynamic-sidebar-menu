import { Component, Input } from '@angular/core';
import { MarkdownElement } from '../markdown-converter/helpers/markdown.helper';

@Component({
  selector: 'app-markdown-preview',
  imports: [],
  templateUrl: './markdown-preview.component.html',
  styleUrl: './markdown-preview.component.scss',
})
export class MarkdownPreviewComponent {
  parsedContent: string = '';

  @Input({ required: true }) set content(content: MarkdownElement[]) {
    this.parsedContent = content
      .map((element) => {
        if (element.type === 'header') {
          return `<h${element.level}>${element.content}</h${element.level}>`;
        } else if (element.content.length === 0) {
          return '<br />';
        } else {
          return `<p>${element.content}</p>`;
        }
      })
      .join('');

    console.log(this.parsedContent);
  }
}
