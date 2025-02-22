import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MarkdownElement, markdownToParsed } from './helpers/markdown.helper';

@Component({
  selector: 'app-markdown-converter',
  imports: [],
  templateUrl: './markdown-converter.component.html',
  styleUrl: './markdown-converter.component.scss',
})
export class MarkdownConverterComponent implements OnInit {
  @Output() content = new EventEmitter<MarkdownElement[]>();

  onMarkdownChange(event: Event) {
    const text = (event.target as HTMLTextAreaElement).value;

    this.content.emit(markdownToParsed(text));
  }

  ngOnInit(): void {
    this.content.emit(markdownToParsed(
      document.querySelector('textarea')?.textContent ?? ''
    ))
  }
}
