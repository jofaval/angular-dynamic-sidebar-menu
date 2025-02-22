import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicSidebarMenuComponent } from "./dynamic-sidebar-menu/dynamic-sidebar-menu.component";
import { MarkdownElement } from './markdown-converter/helpers/markdown.helper';
import { MarkdownConverterComponent } from './markdown-converter/markdown-converter.component';
import { MarkdownPreviewComponent } from "./markdown-preview/markdown-preview.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MarkdownConverterComponent, MarkdownPreviewComponent, DynamicSidebarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-dynamic-sidebar-menu';
  markdownContent: MarkdownElement[] = [];

  onMarkdownChange(content: MarkdownElement[]) {
    this.markdownContent = content;
  }
}
