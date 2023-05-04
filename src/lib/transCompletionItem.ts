import { CompletionItemKind } from "vscode";

interface Detail {
  detail: string;
  documentation: string;
  kind: import("vscode").CompletionItemKind;
  filterText: string;
  label: string;
  insertText: string;
}

/**
 * 将scss文件中的变量补充到vscode提示符中
 * @param variable
 * @returns
 */
export function transCompletionItem(variable: string[]) {
  let res: Detail[] = [];
  variable.forEach((item) => {
    const [key, value] = item.split(":");
    const val = value.replace(";", "");
    res.push({
      detail: key,
      documentation: val,
      kind: CompletionItemKind.Color,
      filterText: val,
      label: val,
      insertText: key,
    });
  });
  return res;
}
