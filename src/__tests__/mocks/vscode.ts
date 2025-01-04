type Disposable = {
  dispose: () => void;
};

interface ThemeColorImpl {
  id: string;
}

const mockThemeColor = jest.fn().mockImplementation((id: string) => {
  return { id } as ThemeColorImpl;
});

export const mockRange = jest.fn();
export const mockPosition = jest.fn();
export const mockMarkdownString = jest.fn().mockImplementation(() => {
  let content = "";
  return {
    appendMarkdown: jest.fn((text) => {
      content += text;
      return this;
    }),
    get value() {
      return content;
    },
  };
});
export const mockHover = jest.fn().mockImplementation((content, range) => ({
  contents: [content],
  range,
}));
export const mockTextEditorDecorationType: Disposable = {
  dispose: jest.fn(),
};
export const mockSubscriptions: Disposable[] = [];

export const window = {
  createTextEditorDecorationType: jest
    .fn()
    .mockReturnValue(mockTextEditorDecorationType),
  activeTextEditor: {
    document: {
      getText: jest.fn(),
      positionAt: jest.fn(),
    },
    setDecorations: jest.fn(),
  },
  onDidChangeActiveTextEditor: jest.fn(),
};

export const workspace = {
  onDidChangeTextDocument: jest.fn(),
};

export const languages = {
  registerHoverProvider: jest.fn().mockReturnValue({ dispose: jest.fn() }),
};

export const Range = jest
  .fn()
  .mockImplementation((startLine, startChar, endLine, endChar) => ({
    start: { line: startLine, character: startChar },
    end: { line: endLine, character: endChar },
  }));

export const Position = jest.fn().mockImplementation((line, character) => ({
  line,
  character,
}));

export const MarkdownString = mockMarkdownString;
export const Hover = mockHover;
export const ThemeColor = mockThemeColor;
