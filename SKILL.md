---
name: flowmaker
description: 生成单 HTML、零后端、可拖拽编辑的网页流程图。LLM 只产出 nodes/edges 的 JSON，引擎自动布局并渲染成浅色玻璃风、带判断菱形/起止圆角条/处理矩形三种形状的可交互流程图（拖节点、拖连线、双击改名、面板增删）。Use when 用户要"做流程图/画流程图/把流程画出来/流程可视化/flowchart/泳道/判断分支图"，尤其要可在浏览器里编辑、且要一个独立 HTML 文件不带后端。NOT for 纯静态示意图（直接 mermaid 即可）、需要服务端渲染的大批量图表。
---

# flowmaker — 单 HTML 网页流程图生成器

把一段流程描述，变成一个**自包含 HTML 文件**：浅色 ppvi 玻璃风、可拖拽编辑、零后端、双击文件即开。引擎（React Flow + dagre + 三形状）已封装在 `assets/template.html`，你只需产出流程的 JSON 数据并注入模板。

## 工作流

1. **澄清流程**（信息不足时）：起点/终点、关键步骤、判断分支、各分支去向。能从描述推断就直接画，别过度追问。
2. **建数据**：把流程拆成 `nodes` + `edges`，写成下方 schema 的 JSON。
   - 优先**省略坐标**，让 dagre 自动布局（最省事，任意流程都能排）。
   - 只有要精确复刻某个版式时才手动给 `x`/`y`（给了坐标就不触发自动布局）。
3. **生成文件**：复制 `assets/template.html` → 把 `<script id="flow-data">` 块整体替换为你的 JSON → 把 `<title>__TITLE__</title>` 的 `__TITLE__` 换成流程标题 → 另存为 `outputs/{YYYY-MM-DD}-{主题}-flowchart.html`。
4. **打开验证**：用浏览器打开确认渲染正常（节点、连线、菱形、可拖拽）。

## 数据 Schema

```json
{
  "title": "顶栏标题",
  "subtitle": "顶栏副标题（可省略）",
  "direction": "TB",
  "nodes": [
    { "id": "唯一id", "title": "主标题", "sub": "子标题/概述(可省)", "kicker": "小标签(可省)",
      "detail": "点「详情 ▾」弹层显示的长内容(可省，支持多行)",
      "shape": "process|terminator|decision", "variant": "|start|gold|muted",
      "x": 0, "y": 0 }
  ],
  "edges": [
    { "source": "id", "target": "id", "label": "线上文字(可省)",
      "dashed": false, "sh": "b", "th": "t" }
  ]
}
```

字段说明：

| 字段 | 取值 | 含义 |
|---|---|---|
| `shape` | `process`（默认，矩形）/ `terminator`（起止，圆角条）/ `decision`（判断，扁菱形） | 节点形状 |
| `variant` | 空（普通）/ `start`（蓝，起点）/ `gold`（金，强调/终点）/ `muted`（灰虚线，弱化/失败分支） | 配色 |
| `kicker` | 短文本 | 节点上方小标签；**菱形节点会自动隐藏 kicker/sub，只显示一行灰色小字**，所以判断节点只写 `title` |
| `detail` | **HTML 字符串** | 节点显示「详情 ▾」按钮，点开浮层模态看完整内容。**详细攻略/命令/配置放这里，节点本身只写概述**，避免撑乱排版。按 HTML 渲染：`<a href target="_blank">` 可点链接、`<pre><code>` 代码块、`<span class="os win/mac">` 区分系统、`<ul>/<p>/<b>`、`<span class="tip">` 提示框。攻略类要详细、分 Windows/macOS、把用户当小白、多写解释 |
| `dashed` | true/false | 虚线（用于"否/出局/失败"等弱分支），自动取消流动动画 |
| `sh`/`th` | `t/b/l/r`（默认 `b`→`t`） | 连线接哪个 handle；侧向分支用 `"sh":"r","th":"tl"` 走右侧更顺 |
| `x`/`y` | 数字 | 手动坐标；**全部节点都给才生效**，否则整体走 dagre 自动布局 |

## 形状用法约定

- **起点 / 终点** → `terminator`（起点配 `start` 蓝，终点配 `gold` 金）
- **普通步骤** → `process`
- **判断 / 分支点** → `decision`，title 用问句（"通过审核？"），向外引两三条带 `label`（"是"/"否"）的边，弱分支加 `dashed`
- 主干尽量用同一套 handle（默认 b→t）走直线；侧向分支才用 `r`/`tl`

## 排版控制（节点别太胖）

节点宽度固定、**高度随内容自适应**。控制高度靠内容，不靠改尺寸：

- 节点上只放<b>概述</b>：`title` 一行 + `sub` 一行短句（≤ ~10 字，避免换行撑高）。
- 详细内容（命令、配置、分系统说明）全放 `detail` 浮层，别堆在 `sub`。
- 起止节点（terminator）尤其要短：`title` 一行，长描述移到 `sub` 或 `detail`，否则圆角卡片会变高。

## 交互（产物自带，无需额外代码）

拖动节点 · 从节点圆点拖出新连线 · 双击节点开编辑面板（改 kicker/标题/子标题/形状/配色） · 单击连线改线上文字 · 面板内删节点/删连线 · Delete 键删 · ＋添加节点。

## 技术说明

- 单文件，运行时通过 esm.sh CDN 加载 React 18 / @xyflow/react 12 / @dagrejs/dagre 1 / htm，**无构建、无后端**，需联网拉 CDN。
- 自动布局用 dagre（`direction` 控制 TB/LR/RL/BT）。
- 视觉为浅色 ppvi：玻璃磨砂节点、金/蓝/灰状态色、判断菱形为 SVG 多边形（均匀描边、不会在锐角处糊成灰块）。

参考 `examples/worldcup.json`（手动坐标版）与模板内置示例（自动布局版）。
