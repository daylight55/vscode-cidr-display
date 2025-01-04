jest.mock("vscode");

import type { ExtensionContext, TextDocument } from "vscode";
import * as vscode from "vscode";
import { Position, Range } from "vscode";
import { activate } from "../extension";

describe("Extension", () => {
  let mockContext: ExtensionContext;
  let hoverProvider: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContext = {
      subscriptions: [],
      workspaceState: {
        get: jest.fn(),
        update: jest.fn(),
      },
      globalState: {
        get: jest.fn(),
        update: jest.fn(),
        setKeysForSync: jest.fn(),
      },
      extensionPath: "",
      extensionUri: {} as any,
      environmentVariableCollection: {} as any,
      extensionMode: 1,
      storageUri: null,
      globalStorageUri: {} as any,
      logUri: {} as any,
      storagePath: "",
      globalStoragePath: "",
      logPath: "",
      asAbsolutePath: jest.fn(),
      secrets: {
        get: jest.fn(),
        store: jest.fn(),
        delete: jest.fn(),
      },
      extension: {} as any,
      languageModelAccessInformation: {} as any,
    } as unknown as ExtensionContext;

    // Capture the hover provider when registering
    (vscode.languages.registerHoverProvider as jest.Mock).mockImplementation(
      (_, provider) => {
        hoverProvider = provider;
        return { dispose: jest.fn() };
      },
    );

    activate(mockContext);
  });

  describe("Hover Provider", () => {
    it("should register hover provider for all languages", () => {
      expect(vscode.languages.registerHoverProvider).toHaveBeenCalledWith(
        "*",
        expect.any(Object),
      );
    });

    it("should return null when no CIDR pattern is found", () => {
      const mockDocument = {
        getWordRangeAtPosition: jest.fn().mockReturnValue(null),
      } as unknown as TextDocument;
      const mockPosition = new Position(0, 0);

      const result = hoverProvider.provideHover(mockDocument, mockPosition);
      expect(result).toBeNull();
    });

    it("should return hover info for valid CIDR", () => {
      const mockRange = new Range(0, 0, 0, 13);
      const cidrText = "192.168.1.0/24";

      const mockDocument = {
        getWordRangeAtPosition: jest.fn().mockReturnValue(mockRange),
        getText: jest.fn().mockReturnValue(cidrText),
      } as unknown as TextDocument;
      const mockPosition = new Position(0, 0);

      const result = hoverProvider.provideHover(mockDocument, mockPosition);

      expect(result).toBeTruthy();
      expect(result.contents[0].value).toContain(
        "**Host address**: `192.168.1.0`",
      );
      expect(result.contents[0].value).toContain(
        "**Addresses in network**: `256`",
      );
      expect(result.contents[0].value).toContain(
        "**Network range**: `192.168.1.0 - 192.168.1.255`",
      );
      expect(result.contents[0].value).toContain(
        "**Usable range**: `192.168.1.1 - 192.168.1.254`",
      );
    });
  });

  describe("Decoration Provider", () => {
    it("should create text editor decoration type", () => {
      expect(vscode.window.createTextEditorDecorationType).toHaveBeenCalledWith(
        {
          after: {
            margin: "0 0 0 1em",
            color: { id: "editorCodeLens.foreground" },
          },
        },
      );
    });

    it("should update decorations when text changes", () => {
      const mockEditor = vscode.window.activeTextEditor;
      const mockDocument = mockEditor?.document;
      if (mockDocument) {
        (mockDocument.getText as jest.Mock).mockReturnValue(
          "test 192.168.1.0/24 test",
        );
        (mockDocument.positionAt as jest.Mock)
          .mockReturnValueOnce(new Position(0, 5))
          .mockReturnValueOnce(new Position(0, 18));
      }

      // Trigger text change
      const mockEvent = {
        document: mockDocument,
      };
      const handler = (vscode.workspace.onDidChangeTextDocument as jest.Mock)
        .mock.calls[0][0];
      handler(mockEvent);

      expect(mockEditor?.setDecorations).toHaveBeenCalled();
    });
  });
});
