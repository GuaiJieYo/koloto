import createPost from "./createPost.ts";

const params = process.argv.slice(2);

const USAGES = `
用法：pnpm koloto new <文章名称> [文章类型]

参数：
  new       创建新文章
  <文章名称>  文章名称
  [文章类型]  文章类型，可选，默认为 article
`;

if (params.length < 1) {
	console.log("缺少参数！");
	console.log(USAGES);
	process.exit(1);
}

// 匹配参数
switch (params[0]) {
	case "help":
		console.log(USAGES);
		break;
	case "new":
		// 创建文章
		createPost(params[1], params[2]);
		break;
	default:
		console.log("参数不存在！");
		break;
}
