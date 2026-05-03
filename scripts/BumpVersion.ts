/**
 * 此脚本用于更新项目版本号
 * 项目版本号遵循语义化版本
 * DOCS: https://semver.org/lang/zh-CN/
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { confirm, input, select } from "@inquirer/prompts";

// 预编译语义化版本号正则，避免重复创建
const SEMVER_REGEX =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

// 统一定义选择器主题中的键盘提示，消除重复代码
const KEYS_HELP_TIP = (keys: [string, string][]) =>
  keys
    .map(([key, action]) => {
      if (action === "navigate") action = "选择喵";
      if (action === "select") action = "确认喵";
      return `${key} : ${action}`;
    })
    .join(" | ");

interface PackageJson {
  version: string;
}

/** 读取 package.json */
function readPkg(): PackageJson {
  try {
    const content = readFileSync(
      path.join(process.cwd(), "package.json"),
      "utf-8",
    );
    return JSON.parse(content) as PackageJson;
  } catch (error) {
    console.error("❌ 读取 package.json 失败:", error);
    process.exit(1);
  }
}

/** 写入 package.json */
function writePkg(pkg: PackageJson): void {
  try {
    writeFileSync(
      path.join(process.cwd(), "package.json"),
      JSON.stringify(pkg, null, 2),
    );
  } catch (error) {
    console.error("❌ 写入 package.json 错误:", error);
    process.exit(1);
  }
}

/** 测试版本号是否符合语义化规范 */
function testVersionAvailable(version: string): boolean {
  return SEMVER_REGEX.test(version);
}

// 监听 ExitPromptError，其他错误仍需抛出
process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("👋 你取消了操作喵!");
    process.exit(0);
  }
  throw error;
});

// ---------- 主逻辑 ----------
const pkg = readPkg();
if (!testVersionAvailable(pkg.version)) {
  console.error("🚫 当前版本号不符合语义化版本规范，请检查 package.json");
  // 询问用户是否需要重置版本号
  const reset = await confirm({
    message: "是否需要重置版本号喵?",
    default: false,
  });

  if (reset) {
    pkg.version = "0.0.0";
    writePkg(pkg);
  } else {
    process.exit(1);
  }
}

// 一次性解析版本结构 —— 主版本、次版本、修订号，以及先行版本号
const [versionCore, _preRelease = ""] = pkg.version.split("-");
const [majorStr, minorStr, patchStr] = versionCore.split(".");
const major = parseInt(majorStr, 10);
const minor = parseInt(minorStr, 10);
const patch = parseInt(patchStr, 10);

console.log("🐱 开始更新版本号了喵！");
console.log(`📦 当前版本号为 \x1b[31m${pkg.version}\x1b[0m 喵！\n`);

// 选择升级类型
const upgradeType = await select({
  message: "🔖 选择你需要更新的版本号喵 (x.y.z-a)",
  choices: [
    { name: "🚀 主版本号 (x)", value: "major" },
    { name: "✨ 次版本号 (y)", value: "minor" },
    { name: "🐛 修订号 (z)", value: "patch" },
    { name: "🧪 添加/修改先行版本号 (a)", value: "pre" },
    { name: "✏️ 自定义版本号", value: "custom" },
  ],
  theme: {
    style: {
      keysHelpTip: KEYS_HELP_TIP,
    },
    indexMode: "number",
  },
});

let newVersion: string;

switch (upgradeType) {
  case "major":
    newVersion = `${major + 1}.0.0`;
    break;
  case "minor":
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case "patch":
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
  case "pre": {
    const preChoice = await select({
      message: "🧪 选择你需要的先行版本号喵",
      choices: [
        { name: "🧬 内测版 (alpha)", value: "alpha" },
        { name: "🧫 公测版 (beta)", value: "beta" },
        { name: "🧪 候选版 (rc)", value: "rc" },
        { name: "✏️  自定义先行标签", value: "custom" },
      ],
      theme: {
        style: {
          keysHelpTip: KEYS_HELP_TIP,
        },
        indexMode: "number",
      },
    });

    const label =
      preChoice === "custom"
        ? await input({
            message: "🏷️ 请输入新的先行版本号喵:",
            required: true,
          })
        : preChoice;

    newVersion = `${major}.${minor}.${patch}-${label}`;
    if (!testVersionAvailable(newVersion)) {
      console.log("🚫 啊哦！生成的先行版本号不符合语义化版本规定喵。");
      process.exit(1);
    }
    break;
  }
  case "custom": {
    newVersion = await input({
      message: "🏷️ 请输入新的版本号喵:",
      required: true,
    });
    if (!testVersionAvailable(newVersion)) {
      console.log("🚫 啊哦！当前版本号不符合语义化版本规定喵。");
      process.exit(1);
    }
    break;
  }
  default:
    console.log("❌ 无效的选择，程序退出喵！");
    process.exit(1);
}

pkg.version = newVersion;
writePkg(pkg);
console.log(`✅ 版本号已更新为 \x1b[32m${newVersion}\x1b[0m 喵！🎉`);
