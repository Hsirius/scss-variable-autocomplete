import * as vscode from "vscode";
const path = require("path");

import { getScssVariable } from "./lib/getScssVariable";
import { transCompletionItem } from "./lib/transCompletionItem";

const scssFileChange = vscode.workspace.createFileSystemWatcher(
  "**/*.scss",
  true,
  false,
  true
);
async function handleScssVariableChange() {
  const scssVariable = await getScssVariable();
  return await transCompletionItem(scssVariable);
}

export async function activate(context: vscode.ExtensionContext) {
  let completionItem = await handleScssVariableChange();

  vscode.workspace.onDidChangeConfiguration(async (e) => {
    if (e.affectsConfiguration("scssFilePath")) {
      completionItem = await handleScssVariableChange();
    }

    scssFileChange.onDidCreate(async () => {
      completionItem = await handleScssVariableChange();
    });

    scssFileChange.onDidChange(async () => {
      completionItem = await handleScssVariableChange();
    });
    scssFileChange.onDidDelete(async () => {
      completionItem = await handleScssVariableChange();
    });
  });

  const cc = vscode.languages.registerCompletionItemProvider(
    "scss",
    {
      provideCompletionItems() {
        return completionItem;
      },
    },
    "#",
    ":"
  );
  context.subscriptions.push(cc);
}

// this method is called when your extension is deactivated
export function deactivate() {
  scssFileChange.dispose();
}
