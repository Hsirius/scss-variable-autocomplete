import { workspace } from "vscode";
const fs = require("fs");

/**
 * 获取配置中文件的变量
 * @returns
 */
export async function getScssVariable() {
  try {
    const configuration = workspace.getConfiguration();
    const filePath = Array.from(new Set(configuration.scssFilePath.split(";")));
    let res = [];
    for (let i = 0; i < filePath.length; i++) {
      const item = filePath[i];
      const paths = await workspace.findFiles(`**/${item}`, "/node_modules/");
      if (!paths || paths.length === 0) {
        return [];
      }
      for (let j = 0; j < paths.length; j++) {
        const scssStr = await fs.readFileSync(paths[j].fsPath, "utf8");
        const splitStr =
          scssStr
            .split(/[\r\n]+/)
            .filter((str: string) => str.startsWith("$")) || [];
        res.push(...splitStr);
      }
    }
    return res;
  } catch (err: any) {
    throw new Error(err);
  }
}
