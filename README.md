# flowmaker

> 一句话流程描述 → 一个**单 HTML、零后端、可拖拽编辑**的网页流程图。

flowmaker 是一个 [Claude Code](https://claude.com/claude-code) / Agent Skill。给它一段流程，它产出一个自包含 `.html` 文件：浅色玻璃拟态风格，带**判断菱形 / 起止圆角条 / 处理矩形**三种标准流程图形状，在浏览器里可以拖节点、拖连线、双击改名、增删——双击文件即开，不需要任何服务端。

## 特性

- **单文件，零后端** —— 运行时经 CDN 加载 React Flow + dagre，无需构建、无需服务器
- **三种标准形状** —— 处理（矩形）、起止（圆角条）、判断（扁菱形，SVG 多边形描边）
- **可视化编辑** —— 拖拽布局、拖圆点连线、双击节点编辑（标题/子标题/形状/配色）、单击连线改字、面板增删、Delete 删除
- **自动布局** —— 只给 nodes/edges，dagre 自动排版（支持 TB/LR 方向）；也可手动给坐标精确控制
- **浅色玻璃美学** —— 克制的灰阶基底 + 金/蓝/灰状态色，呼应 ppvi 设计语言

## 安装

作为 Claude Code skill：把本仓库放到技能目录即可。

```bash
git clone https://github.com/xntj-ai/flowmaker.git ~/.claude/skills/flowmaker
```

之后对 Claude 说"用 flowmaker 把这个流程画成网页流程图"，或直接描述流程并要求生成可编辑的单 HTML 流程图。

## 直接用模板（不经 Claude）

1. 复制 `assets/template.html`
2. 把 `<script id="flow-data" type="application/json">` 里的 JSON 换成你的流程
3. 浏览器打开

数据格式见 [`SKILL.md`](./SKILL.md) 的 Schema 一节，完整示例见 [`examples/worldcup.json`](./examples/worldcup.json)。

## 示例

[`examples/worldcup.html`](./examples/worldcup.html) —— 2026 世界杯赛制流程（48 队），含两个判断菱形分支点（小组排名 / 半决赛胜负）。在浏览器打开即可交互。

## 数据格式速览

```json
{
  "title": "审核流程",
  "direction": "TB",
  "nodes": [
    { "id": "a", "title": "提交申请", "shape": "terminator", "variant": "start" },
    { "id": "b", "title": "人工初审" },
    { "id": "c", "title": "通过？", "shape": "decision" },
    { "id": "d", "title": "归档", "shape": "terminator", "variant": "gold" },
    { "id": "e", "title": "驳回", "variant": "muted" }
  ],
  "edges": [
    { "source": "a", "target": "b" },
    { "source": "b", "target": "c" },
    { "source": "c", "target": "d", "label": "是" },
    { "source": "c", "target": "e", "label": "否", "dashed": true }
  ]
}
```

## 技术栈

[React Flow (@xyflow/react)](https://reactflow.dev) · [dagre](https://github.com/dagrejs/dagre) · [htm](https://github.com/developit/htm) · 全部经 [esm.sh](https://esm.sh) 在浏览器内加载，无打包步骤。

## License

[MIT](./LICENSE)
