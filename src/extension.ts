import * as vscode from "vscode";
import { calculateCIDRInfo } from "./cidrUtils";

export function activate(context: vscode.ExtensionContext) {
  // Hover Provider
  const hoverProvider = vscode.languages.registerHoverProvider("*", {
    provideHover(document: vscode.TextDocument, position: vscode.Position) {
      const wordRange = document.getWordRangeAtPosition(
        position,
        /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}\b/,
      );

      if (!wordRange) {
        return null;
      }

      const cidr = document.getText(wordRange);
      const cidrInfo = calculateCIDRInfo(cidr);

      if (!cidrInfo) {
        return null;
      }

      const content = new vscode.MarkdownString();
      content.appendMarkdown(
        `**Host address**: \`${cidrInfo.hostAddress}\`\n\n`,
      );
      content.appendMarkdown(
        `**Addresses in network**: \`${cidrInfo.totalIPs.toLocaleString()}\`\n\n`,
      );
      content.appendMarkdown(
        `**Network range**: \`${cidrInfo.startIP} - ${cidrInfo.endIP}\`\n\n`,
      );
      content.appendMarkdown(
        `**Usable range**: \`${cidrInfo.firstUsableIP} - ${cidrInfo.lastUsableIP}\``,
      );

      return new vscode.Hover(content, wordRange);
    },
  });

  // Inline Decoration Provider
  const decorationType = vscode.window.createTextEditorDecorationType({
    after: {
      margin: "0 0 0 1em",
      color: new vscode.ThemeColor("editorCodeLens.foreground"),
    },
  });

  let activeEditor = vscode.window.activeTextEditor;

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }

    const text = activeEditor.document.getText();
    const decorations: vscode.DecorationOptions[] = [];
    const cidrPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}\b/g;
    let match;

    while ((match = cidrPattern.exec(text))) {
      const startPos = activeEditor.document.positionAt(match.index);
      const endPos = activeEditor.document.positionAt(
        match.index + match[0].length,
      );
      const cidrInfo = calculateCIDRInfo(match[0]);

      if (cidrInfo) {
        const decoration: vscode.DecorationOptions = {
          range: new vscode.Range(startPos, endPos),
          renderOptions: {
            after: {
              contentText: `[ ${cidrInfo.totalIPs.toLocaleString()} addresses ]`,
            },
          },
        };
        decorations.push(decoration);
      }
    }

    activeEditor.setDecorations(decorationType, decorations);
  }

  if (activeEditor) {
    updateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
      if (editor) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions,
  );

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions,
  );

  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
