declare module 'mammoth' {
  export interface MammothResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export interface MammothOptions {
    arrayBuffer?: ArrayBuffer;
    buffer?: Buffer | ArrayBuffer;
    path?: string;
    styleMap?: string | string[];
    includeDefaultStyleMap?: boolean;
  }

  export function convertToHtml(input: MammothOptions, options?: any): Promise<MammothResult>;
  export function extractRawText(input: MammothOptions): Promise<MammothResult>;
  export function convertToMarkdown(input: MammothOptions, options?: any): Promise<MammothResult>;

  const mammoth: {
    convertToHtml: typeof convertToHtml;
    extractRawText: typeof extractRawText;
    convertToMarkdown: typeof convertToMarkdown;
  };

  export default mammoth;
}
