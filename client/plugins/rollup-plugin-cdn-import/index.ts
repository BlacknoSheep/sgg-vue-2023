/*
通过字符串替换的方式，将打包好的js文件中的import语句改为全局变量，并在html文件中添加cdn链接
!!!: 请务必设置 viteconfig.build.minify:true（默认值），否则可能会替换失败
!!!: 使用前请确保先格式化代码
!!!: 由于是全局字符串替换，可能会导致对包含import语句的字符串进行更改
*/
import type { Plugin } from "~/node_modules/.pnpm/rollup@3.29.4/node_modules/rollup/dist/rollup.d.ts";

interface CdnImportMap {
  // key: 要从外部导入的包名
  [key: string]: {
    globalVal: string; // 对应的全局变量，""表示删除该import语句（如删除css）
    cdn?: string; // 对应的cdn地址
  };
}

export default function CdnImportPlugin(map: CdnImportMap): Plugin {
  const externals = Object.keys(map);
  return {
    name: "external-import-rewrite",
    version: "0.0.1",
    generateBundle(options, bundle) {
      for (const filename in bundle) {
        if (filename.endsWith(".js")) {
          // 将js文件中的import语句改为全局变量
          let code: string = bundle[filename]["code"];
          // 读取所有import语句
          const regex = RegExp(`import.+?";`, "g");
          const ipts = code.match(regex);
          const replaceMap = new Map<string, string>(); // 需要替换的import语句
          for (const ipt of ipts) {
            let replaceIpt: string = ipt; // 替换后的import语句
            const iptSource: string = ipt.split(`"`).at(-2);
            if (externals.includes(iptSource)) {
              if (!ipt.includes("from")) {
                replaceMap.set(ipt, map[iptSource].globalVal);
                continue;
              }
              const iptTarget: string = map[iptSource].globalVal;
              // 拆分如 import Vue, { createApp } from "vue"; 的语句
              replaceIpt = replaceIpt.replace(/,\s?{/, ` from"${iptSource}";import{`);
              // 删除与全局变量同名的import语句
              replaceIpt = replaceIpt.replace(new RegExp(`import ${iptTarget} from.+?";`, "g"), "");
              // 替换 as 为 :
              replaceIpt = replaceIpt.replace(/ as /g, ":");
              // 替换 import 为 const
              replaceIpt = replaceIpt.replace(/import([ {])/g, "const $1");
              // 替换 from 为 =
              replaceIpt = replaceIpt.replace(/from(\s?")/g, "=$1");
              // 替换external包名为全局变量
              replaceIpt = replaceIpt.replace(new RegExp(`['"]${iptSource}['"]`, "g"), iptTarget);
              replaceMap.set(ipt, replaceIpt);
            }
          }
          // console.log(replaceMap);
          // 对code进行替换
          console.log("\n");
          replaceMap.forEach((value, key) => {
            code = code.replace(key, value);
            // console.log(`\x1b[32m[external-import-rewrite]\x1b[0m ${key} => ${value}`);
          });
          bundle[filename]["code"] = code;
        } else if (filename == "index.html") {
          let code: string = bundle[filename]["source"];
          // title标签行的缩进
          const indent: string = code.match(/(?<=\n)(\s*)<title>/)?.[1];
          // 在html文件中添加cdn链接
          let replaceHtml: string = "</title>\n";
          for (const external of externals) {
            const cdn: string = map[external].cdn;
            if (cdn) {
              if (cdn.endsWith(".css")) {
                replaceHtml += `${indent}<link rel="stylesheet" href="${cdn}">\n`;
              } else {
                replaceHtml += `${indent}<script src="${cdn}"></script>\n`;
              }
            }
          }
          code = code.replace("</title>\n", replaceHtml);
          bundle[filename]["source"] = code;
        }
      }
    },
  };
}

export { CdnImportMap };
