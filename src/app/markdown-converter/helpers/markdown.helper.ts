export type MarkdownElement =
  | {
      content: string;
    } & (
      | {
          type: 'header';
          level: number;
        }
      | {
          type: 'paragraph';
        }
    );

export const markdownToParsed = (markdown: string): MarkdownElement[] => {
  return markdown.split('\n').reduce((acc: MarkdownElement[], line: string) => {
    if (line.startsWith('#')) {
      const level = line.match(/#/g)?.length ?? 0;
      acc.push({ type: 'header', level, content: line.replace(/^#+\s+/g, '').trimStart() });
    } else {
      acc.push({ type: 'paragraph', content: line });
    }

    return acc;
  }, []);
};
