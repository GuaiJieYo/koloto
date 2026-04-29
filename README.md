# Koloto
<img align='right' src='docs/imgs/koloto.png' width='200px' alt="Koloto logo">

一个现代化、功能丰富的静态博客模板，基于 [Astro](https://astro.build) 构建，支持 MDX 内容创作。

[![Node.js >= 22.12.0](https://img.shields.io/badge/node.js-%3E%3D22.12.0-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-6.x-orange)](https://astro.build/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg?logo=gpl)](https://www.gnu.org/licenses/gpl-3.0.html)

<!-- [**🖥️ 在线演示**]() | [**📚 文档**](./docs/) -->

<!-- 🌏 **Language:** -->
<!-- [**English**](./docs/EN/) / [**中文**](./docs/ZH/) -->

---

## ✨ 功能特性

### 🎨 设计与界面
- [x] 基于 [Astro](https://astro.build) 构建
- [x] 支持 MDX 内容创作
- [x] 全设备响应式设计
- [x] 标签分类系统

### 🔧 技术特性
- [x] **MDX 支持** - 使用 @astrojs/mdx
- [x] **RSS 订阅** - 使用 @astrojs/rss
- [x] **代码规范检查** - 使用 Biome
- [x] **内容集合** - 使用 Astro Content Collections
- [x] **类型安全** - 完整的 TypeScript 支持
- [x] **支持 GFM 风格** - 完整的 GitHub Flavored Markdown 支持

## 🚀 快速开始

### 📦 安装

1. **克隆仓库：**
   ```bash
   git clone https://github.com/guaijieyo/koloto.git
   cd koloto
   ```

2. **安装依赖：**
   ```bash
   pnpm install
   ```
   
   > ⚠️ 如果出现 `Ignored build scripts: @parcel/watcher@...`, `esbuild@...`, `sharp@...` 等警告，请运行 `pnpm approve-builds` 手动选择允许构建这些包。否则部分功能会无法正常加载。

3. **启动开发服务器：**
   ```bash
   pnpm dev
   ```
   博客将在 `http://localhost:4321` 可用

### 📝 内容管理

- **创建新文章：** `pnpm new <文件名> [article|draft]`
- **文章目录：** `post/article/` (已发布) / `post/draft/` (草稿)
- **添加图片：** 放在 `src/assets/` 或 `public/` 中

### 🚀 部署

将博客部署到任何静态托管平台：

- **Vercel：** 连接 GitHub 仓库到 Vercel
- **Netlify：** 直接从 GitHub 部署
- **GitHub Pages：** 使用 GitHub Actions
- **Cloudflare Pages：** 连接您的仓库

## 📝 文章格式

```yaml
---
title: 我的第一篇博客文章
description: 这是我新博客的第一篇文章。
tags: [标签1, 标签2]
createDate: 2023-09-09
heroImage: ./cover.jpg
---
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 文章标题 |
| description | 否 | 文章描述，用于 SEO 和预览 |
| tags | 否 | 标签数组，用于分类 |
| createDate | 是 | 创建日期 |
| heroImage | 否 | 封面图片路径（相对于文章文件） |

## ⚡ 命令

所有命令都在项目根目录运行：

| 命令 | 操作 |
|:-----|:-----|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 在 `localhost:4321` 启动本地开发服务器 |
| `pnpm build` | 构建生产站点到 `./dist/` |
| `pnpm preview` | 在部署前本地预览构建 |
| `pnpm check` | 运行 Astro 类型检查 |
| `pnpm lint` | 使用 Biome 检查代码 |
| `pnpm lint:fix` | 自动修复代码问题 |
| `pnpm new <文件名> [article\|draft]` | 创建新文章 |

## 📂 项目结构

```
koloto/
├── src/
│   ├── content/
│   │   └── blog/          # MDX 文章内容
│   ├── pages/             # 页面路由
│   ├── layouts/           # 布局组件
│   └── components/        # 组件
├── post/
│   ├── article/           # 已发布的文章
│   └── draft/             # 草稿文章
├── public/                # 静态资源
└── docs/                  # 项目文档
```

## 📄 许可证

本项目基于 GNU General Public License v3.0 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 基于 [Astro](https://astro.build) 构建
- 使用 [Biome](https://biomejs.dev/) 进行代码规范检查

## 📷 图片版权声明

- `docs/imgs/Vscode.png` - 作者 [Aikoyori](https://github.com/Aikoyori) 绘制
- `docs/imgs/Vue.png` - 作者 [SAWARATSUKI](https://github.com/SAWARATSUKI) 绘制

除上述声明外，其他图片及资源版权归项目作者所有。