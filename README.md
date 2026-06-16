# flowmaker

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-d97757.svg)](https://claude.com/claude-code)
[![Output: single HTML](https://img.shields.io/badge/output-single%20HTML-2ea44f.svg)](#examples--示例)

**One line of process description → a single-file, zero-backend, drag-to-edit web flowchart.**

**一句话流程描述 → 一个单 HTML、零后端、可拖拽编辑的网页流程图。**

flowmaker is a [Claude Code](https://claude.com/claude-code) / Agent skill. Hand it a process and it produces a self-contained `.html` file: a light, glassmorphism flowchart built from the three standard shapes — decision diamonds, start/end pills, and process rectangles — that you can drag, reconnect, rename, and edit right in the browser. Double-click the file to open it. There is no server, no build step, and nothing to install.

flowmaker 是一个 [Claude Code](https://claude.com/claude-code) / Agent 技能。给它一段流程,它就产出一个自包含的 `.html` 文件:浅色玻璃拟态风格,由判断菱形、起止圆角条、处理矩形三种标准流程图形状组成,在浏览器里就能拖节点、改连线、双击重命名、增删。双击文件即开 —— 没有服务端,不用构建,也不必安装任何东西。

## Why flowmaker · 为什么用 flowmaker

Most "text to flowchart" tools hand you a static image or a Mermaid block. That is fine for a quick sketch, but it falls apart the moment someone wants to move a box, fix a label, or add a branch. flowmaker takes the opposite stance: the output is a real, editable artifact — a single HTML file you can email, drop into a wiki, or hand to a non-technical colleague, and they can rearrange it in the browser with no tooling at all.

多数"文字转流程图"工具给你的是一张静态图或一段 Mermaid。画草稿够用,但只要有人想挪个框、改个字、加个分支,就卡住了。flowmaker 反其道而行:产物是一个真正可编辑的成品 —— 一个 HTML 文件,可以邮件发出去、塞进 wiki,或者直接丢给不懂技术的同事,对方在浏览器里就能重新排布,完全不需要任何工具链。

## Features · 功能特性

- **Single file, zero backend** — React Flow and dagre load from a CDN at runtime. No build, no server, nothing to deploy. **单文件、零后端** —— React Flow 与 dagre 在运行时从 CDN 加载,无需构建、无需服务器,也没有任何部署环节。
- **Three standard shapes** — process (rectangle), terminator (rounded pill), and decision (a flat diamond drawn as a stroked SVG polygon, so sharp corners stay crisp). **三种标准形状** —— 处理(矩形)、起止(圆角条)、判断(扁菱形,用描边 SVG 多边形绘制,锐角不糊)。
- **Visual editing** — drag to lay out, pull from a node's handle to draw an edge, double-click a node to edit its title / subtitle / shape / color, click an edge to relabel it, add or remove from the side panel, or press Delete. **可视化编辑** —— 拖拽布局、从节点圆点拉出连线、双击节点改标题/子标题/形状/配色、单击连线改文字、侧栏增删、Delete 键删除。
- **Automatic layout** — supply only nodes and edges and dagre lays everything out (top-to-bottom or left-to-right); give explicit coordinates only when you want a pixel-exact version. **自动布局** —— 只给 nodes 和 edges,dagre 就自动排版(从上到下或从左到右);只有要精确复刻某个版式时才手动给坐标。
- **Detail popovers** — keep nodes compact by pushing long content (commands, configs, step-by-step notes) into a *"详情 ▾"* modal instead of bloating the box. **详情浮层** —— 把长内容(命令、配置、详细步骤)收进「详情 ▾」弹层,而不是把节点撑大,保持版面紧凑。
- **Restrained light aesthetic** — a muted grayscale base with gold / blue / gray accent states, following the [ppvi](https://github.com/xntj-ai/ppvi) design language. **克制的浅色美学** —— 灰阶基底配金/蓝/灰状态色,沿用 [ppvi](https://github.com/xntj-ai/ppvi) 设计语言。

## When to use · 适用场景

Reach for flowmaker when you want a flowchart that lives in a browser and stays editable, packaged as one standalone HTML file with no backend — approval flows, onboarding steps, decision trees, system processes. It is not the right tool for a purely static diagram (a Mermaid block is lighter) or for server-rendered charts produced in bulk.

当你想要一张"活在浏览器里、可以一直改"的流程图,并且要打包成一个不带后端的独立 HTML 文件时,就用 flowmaker —— 审批流、入职步骤、决策树、系统流程都合适。它不适合纯静态示意图(直接用 Mermaid 更轻),也不适合服务端批量渲染的图表。

## Install · 安装

Clone this repository into your Claude Code skills directory:

把本仓库克隆到你的 Claude Code 技能目录:

```bash
git clone https://github.com/xntj-ai/flowmaker.git ~/.claude/skills/flowmaker
```

That is the only setup. The generated chart needs an internet connection on first open (it fetches its libraries from a CDN); nothing is installed locally.

只需这一步。生成的流程图首次打开时需要联网(从 CDN 拉取依赖库),本地不安装任何东西。

## Usage · 用法

**With Claude** — describe a process and ask for an editable flowchart, e.g. *"use flowmaker to turn this approval process into an editable web flowchart."* Claude clarifies anything missing (start / end, key steps, decision branches), builds the `nodes` + `edges` JSON, injects it into the template, and saves an `.html` file you open in a browser.

**对 Claude 说** —— 描述一段流程,要求生成可编辑的流程图,比如"用 flowmaker 把这个审批流程画成可编辑的网页流程图"。Claude 会补齐缺失的信息(起点/终点、关键步骤、判断分支),生成 `nodes` + `edges` 的 JSON,注入模板,另存为一个 `.html` 文件供你在浏览器打开。

**Standalone, without Claude** — the rendering engine ships inside `assets/template.html`, so a model is optional:

**独立使用,不经 Claude** —— 渲染引擎本身就封装在 `assets/template.html` 里,大模型可有可无:

1. Copy `assets/template.html`. · 复制 `assets/template.html`。
2. Replace the JSON inside `<script id="flow-data" type="application/json">` with your own process. · 把 `<script id="flow-data" type="application/json">` 里的 JSON 换成你自己的流程。
3. Open it in a browser. · 浏览器打开即可。

## Data format · 数据格式

A flowchart is just a `title`, a layout `direction`, a list of `nodes`, and a list of `edges`:

一张流程图就是一个 `title`、一个布局方向 `direction`、一组 `nodes` 和一组 `edges`:

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

Field reference · 字段说明:

| Field 字段 | Values 取值 | Meaning 含义 |
|---|---|---|
| `shape` | `process` · `terminator` · `decision` | Node shape: rectangle, rounded pill, or diamond. 节点形状:矩形、圆角条、菱形。 |
| `variant` | empty · `start` · `gold` · `muted` | Color state: normal, blue start, gold emphasis, gray dashed weak-branch. 配色状态:普通、蓝色起点、金色强调、灰色虚线弱分支。 |
| `kicker` | short text | A small label above the node; decision diamonds hide it automatically, so give a decision node only its `title`. 节点上方的小标签;判断菱形会自动隐藏它,所以判断节点只写 `title`。 |
| `detail` | HTML string | Renders a *"详情 ▾"* button that opens a modal — put long content (commands, configs, step-by-step) here so nodes stay compact. 渲染「详情 ▾」按钮,点开浮层看长内容(命令、配置、详细步骤),让节点保持紧凑。 |
| `dashed` | true / false | A dashed edge for weak branches ("no" / "rejected"); also turns off the flow animation. 虚线,用于"否/驳回"等弱分支,并自动取消流动动画。 |
| `sh` / `th` | `t/b/l/r` (default `b`→`t`) | Which handles an edge connects; route side branches more cleanly with `"sh":"r","th":"tl"`. 连线接哪个 handle;侧向分支用 `"sh":"r","th":"tl"` 走得更顺。 |
| `x` / `y` | numbers | Manual coordinates — honored only if every node has them, otherwise the whole graph falls back to dagre auto-layout. 手动坐标 —— 全部节点都给才生效,否则整图走 dagre 自动布局。 |

## Examples · 示例

[`examples/worldcup.html`](./examples/worldcup.html) — the 2026 World Cup format (48 teams), with two decision branches: group ranking and the semifinal win/lose split. Open it in a browser and start dragging.

[`examples/worldcup.html`](./examples/worldcup.html) —— 2026 世界杯赛制(48 队),含两个判断分支:小组排名、半决赛胜负。浏览器打开即可拖拽交互。

[`examples/claude-code-china.html`](./examples/claude-code-china.html) — a second worked example you can open directly to see auto-layout and the detail popover in action.

[`examples/claude-code-china.html`](./examples/claude-code-china.html) —— 第二个可直接打开的示例,演示自动布局与「详情」浮层的实际效果。

## How it works · 技术原理

flowmaker is one HTML file that loads React 18, [React Flow](https://reactflow.dev) (`@xyflow/react` 12), [dagre](https://github.com/dagrejs/dagre) (`@dagrejs/dagre` 1), and [htm](https://github.com/developit/htm) from the [esm.sh](https://esm.sh) CDN at runtime — no bundler and no backend, just an internet connection to fetch the modules. Auto-layout is handled by dagre, with the `direction` field controlling TB / LR / RL / BT. The visuals are light-mode ppvi: frosted-glass nodes, gold / blue / gray state colors, and decision diamonds drawn as SVG polygons with an even stroke so they never smear into gray at the corners.

flowmaker 是一个 HTML 文件,运行时从 [esm.sh](https://esm.sh) CDN 加载 React 18、[React Flow](https://reactflow.dev)(`@xyflow/react` 12)、[dagre](https://github.com/dagrejs/dagre)(`@dagrejs/dagre` 1)和 [htm](https://github.com/developit/htm) —— 无打包、无后端,只需要联网拉取这些模块。自动布局由 dagre 完成,`direction` 字段控制 TB/LR/RL/BT 方向。视觉是浅色 ppvi:玻璃磨砂节点、金/蓝/灰状态色,判断菱形用 SVG 多边形均匀描边绘制,锐角不会糊成灰块。

## FAQ · 常见问题

**Does it need an internet connection?** Yes — the generated file pulls its libraries from a CDN at runtime, so the first open needs network. Your data and your edits stay local.

**需要联网吗?** 需要 —— 生成的文件在运行时从 CDN 拉取依赖库,所以首次打开要有网络。你的数据和编辑都在本地。

**Can I use it without Claude?** Absolutely. Copy `assets/template.html`, swap in your own JSON, and open it. The model is a convenience for turning prose into JSON, not a dependency.

**不用 Claude 能用吗?** 完全可以。复制 `assets/template.html`,换成你自己的 JSON,打开即可。大模型只是帮你把文字变成 JSON 的便利,不是必需品。

**How do I edit the chart after it's generated?** Drag nodes to move them, pull from a node's handle to draw a new edge, double-click a node to open its editor, click an edge to relabel it, and use the panel or the Delete key to remove things.

**生成后怎么改?** 拖节点移动、从圆点拉出新连线、双击节点打开编辑面板、单击连线改文字,用面板或 Delete 键删除。

**How is this different from Mermaid?** Mermaid renders a static diagram from text; flowmaker renders an interactive, drag-to-edit canvas with a designed visual style. Use Mermaid for a throwaway sketch, flowmaker when the chart itself is a deliverable.

**和 Mermaid 有什么区别?** Mermaid 从文字渲染出一张静态图;flowmaker 渲染的是一块可拖拽编辑、带设计感的交互画布。草稿用 Mermaid,流程图本身就是交付物时用 flowmaker。

## Related · 相关

- [ppvi](https://github.com/xntj-ai/ppvi) — the visual identity that flowmaker's light glass aesthetic is built on. flowmaker 浅色玻璃风所沿用的视觉体系。
- [xntj.tv](https://xntj.tv) — more Claude Code workflows and skills from 张拼拼 · XNTJ. 更多来自张拼拼·XNTJ 的 Claude Code 工作流与技能。

## License · 许可证

[MIT](./LICENSE) © [张拼拼 · XNTJ](https://xntj.tv)
