import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const postType = ["article", "draft"];
const articleBaseDir = path.join(process.cwd(), "post");

const USAGES = `
用法：pnpm koloto new <文章名称> [文章类型]

参数：
  new       创建新文章
  <文章名称>  文章名称
  [文章类型]  文章类型，可填 article，draft 默认为 article
`;

function createPost(name?: string, type: string = "article") {
	// 校验文章名称
	if (!name) {
		console.error("缺少参数：文章名称");
		console.log(USAGES);
		process.exit(1);
	}

	// 校验文章类型
	if (!postType.includes(type)) {
		console.error("文章类型错误");
		console.log(USAGES);
		process.exit(1);
	}

	const filePath = path.join(articleBaseDir, type, `${name}.md`);

	// 检查是否已存在
	if (existsSync(filePath)) {
		console.error(`错误: 文章已存在 (${filePath})`);
		process.exit(1);
	}

	// 确保目录存在
	const dirPath = path.dirname(filePath);
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true });
	}

	// 生成文章内容
	const content = `---
title: ${name}
createDate: ${new Date().toISOString()}
---`;

	writeFileSync(filePath, content);
	console.log(`✅ 文章创建成功: ${filePath}`);
}

export default createPost;
