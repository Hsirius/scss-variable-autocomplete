# 适用于 scss 文件的全局变量提示插件

根据输入时的 `rgb` 或者 `hex` 颜色值，提示对应的 `scss` 变量

## 使用方法

在设置项中搜索 SCSS File Path，配置 scss 变量文件，如 public.scss

![图片](https://i.ibb.co/fGVCMT3/scss-file-path-setting.png)

美味不用等，即刻享用，通过 `:` 或者 `#` 唤起提示

![preview.gif](/images/preview.gif)

## 常见问题自查

- vscode setting.json 文件配置，见使用方法
- 仅支持 scss 文件
- 仅匹配以 `$` 开头的变量
- 忽略 `node_modules` 文件夹
- 如有其他问题联系我 sirius_vic@163.com
