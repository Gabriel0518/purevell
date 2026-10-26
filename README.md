# PUREVELL 独立站 · Shopify 主题

PUREVELL 品牌独立站的 Shopify 主题仓库。主题基于 Shopify **Horizon 4.3.0**，按 PUREVELL 的视觉语言完成了品牌化改造：橄榄绿 / 米白色板、Jost 字体、全大写标题与宽松字距，以及 5 个原生定制的 `pv-*` 区块（首页 Hero 轮播、分类图块、分栏促销、服务卖点条、编辑化页脚）。

- 主题根目录：仓库根目录（`layout/`、`config/`、`templates/` 等直接位于根下）
- 主题版本：Horizon 4.3.0
- 品牌色板：主色 `#3B4021`，底色 `#FCFBF0`，页脚暖灰 `#EDEBDF`
- 字体：Jost（正文 `jost_n4`，标题 / 副标题 `jost_n5`）
- 语言：沿用 Horizon 的 57 个 locale 文件（`locales/`）
- 远端仓库：<https://github.com/Gabriel0518/purevell>

## 目录结构

```
purevell/
├── assets/            # 全局 CSS / JS、图标、Purevell 随包占位图（pv-*.jpg）
├── blocks/            # 主题区块（Liquid，下划线前缀为内部区块）
├── config/            # settings_schema.json（全局设置定义）+ settings_data.json（已保存设置）
├── design/
│   └── mockups/       # 11 张设计占位图（PNG 母版，不随主题上传）
├── docs/              # 迁移记录等项目文档
├── layout/            # 页面外壳（theme.liquid、password.liquid）
├── locales/           # 57 个语言与 schema 翻译文件
├── sections/          # 页面区块（含 pv-* 定制区块、header/footer group 配置）
├── snippets/          # 可复用片段（含 pv-logo.liquid 品牌字标）
├── templates/         # 页面模板（JSON 编排 + 少量 Liquid）
├── AGENTS.md          # 主题开发约定（改主题前先读）
├── .shopifyignore     # 不随 `theme push` 上传的路径
└── README.md
```

## 快速开始

```bash
# 1. 安装 Shopify CLI（任选其一）
brew install shopify-cli
npm install -g @shopify/cli

# 2. 登录（浏览器授权）
shopify auth login

# 3. 本地开发预览（主题根目录 = 仓库根目录，无需 --path）
shopify theme dev --store your-store.myshopify.com
```

常用命令：

| 目的 | 命令 |
| --- | --- |
| 本地热更新预览 | `shopify theme dev --store <store>.myshopify.com` |
| 推送到新主题（不发布） | `shopify theme push --unpublished` |
| 更新已有主题 | `shopify theme push --theme <theme-id>` |
| 拉取线上编辑器改动 | `shopify theme pull --theme <theme-id>` |
| 静态检查 | `shopify theme check` |
| 打包 zip | `shopify theme package` |

> `design/`、`docs/`、`AGENTS.md`、`README.md` 已在 `.shopifyignore` 中排除，`theme push` 不会把它们当作主题文件上传。

## 首页编排

`templates/index.json` 的区块顺序（自上而下）：

1. `pv-hero-slider` — 全幅编辑化 Hero 轮播（3 屏：The cashmere house / 14.5 to 15.5 microns / Up to 40% off）
2. `pv-image-tiles` — 双列分类图块（Knitwear / Accessories）
3. `tabbed-product-list` — "Trending now / The edit" 标签切换商品列表
4. `pv-image-tiles` — 三列编辑精选（Our story / Sustainability / Cashmere craft）
5. `pv-split-promo` — 订阅邀请（"Join the PUREVELL list"）
6. `pv-benefits` — 服务卖点条（免运费 / 终身维修 / 30 天退换 / A 级羊绒）

商品页 `templates/product.json`：`product-information` → `pv-benefits` → `product-recommendations`。

## Purevell 定制点

| 模块 | 主要文件 | 说明 |
| --- | --- | --- |
| Hero 轮播 | `sections/pv-hero-slider.liquid`、`assets/pv-hero-slider.js` | 全幅跨屏淡入淡出；悬停、聚焦、`prefers-reduced-motion` 时暂停自动播放 |
| 分类 / 编辑图块 | `sections/pv-image-tiles.liquid` | 双列分类 + 三列编辑流；未选图时回退到随包占位图 |
| 分栏促销 | `sections/pv-split-promo.liquid` | 左图右文（可反向），用于订阅邀请与活动位 |
| 服务卖点条 | `sections/pv-benefits.liquid` | 免运费 / 终身维修 / 30 天退换 / A 级羊绒（14.5–15.5 微米），细线分隔 |
| 编辑化页脚 | `sections/pv-footer.liquid` | 顶部订阅 + 最多 5 列链接（读取 link list）+ 法务条 |
| 品牌字标 | `snippets/pv-logo.liquid` | 内联 SVG 文字标志，继承 `currentColor`，头部滑块/透明态自适应 |
| 页头 | `sections/header-group.json`、`blocks/_header-logo.liquid` | 公告条 + 居中 logo + 左侧菜单 + 首页透明头部 |
| 页脚组 | `sections/footer-group.json` | 绑定 `footer-about` / `footer-join` / `footer-help` / `footer-connect` 菜单 |
| 标签商品列表 | `sections/tabbed-product-list.liquid` | 首页 Trending 区块的标签切换与轮播布局 |
| 品牌样式基线 | `config/settings_data.json` | 色板、Jost 字体阶梯（H1 72 / H2 40 / 正文 16）、直角按钮与输入框、购物车抽屉 |
| 占位图 | `assets/pv-*.jpg` | 主题内小尺寸占位（hero 1920×1080，tile/promo 600×800） |

品牌文案如公告条（`COMPLIMENTARY SHIPPING OVER US$150 · COMPLIMENTARY LIFETIME REPAIRS · 30-DAY RETURNS`）、页脚订阅标题等保存在各 section 的 JSON 设置里，可在主题编辑器或对应 `*-group.json` / `templates/*.json` 中调整。

## 媒体素材

`design/mockups/` 存放 11 张设计阶段的占位纹理图（纯色底 + 细密竖纹）：

- `hero.png` 2400×1400（12:7），平均色即品牌橄榄绿 `#3A3F20`，用于首页 Hero
- 其余 10 张 1200×1500（4:5），对应针织单品（毛衣、开衫、手套、围巾等），用于商品卡与商品画廊

这些 PNG 是母版，不参与主题上传；主题实际引用的是 `assets/pv-*.jpg` 小尺寸版本。替换正式拍摄素材时，请同时更新这两处并保持宽高比。详见 `design/mockups/README.md`。

## 开发约定

- 改主题前先读 `AGENTS.md`：它定义了这个主题在 layout / section / block / snippet / schema / CSS / JS 各层的契约。
- `config/settings_data.json` 由 Shopify 主题编辑器自动生成，手工修改可能被覆盖；批量调整请改 JSON 后一次性提交。
- 前端界面文案放 `locales/`（`en.default.json` 与 `en.default.schema.json`），不要硬编码在 Liquid 里。
- 组件复用优先扩展已有 section / block / snippet，避免新增平行实现。
- 不要提交 `.shopify/`（含 store 与主题 ID）以及任何密钥。

迁移前的检查基线：`shopify theme check` 共检查 365 个文件，**0 错误、7 条 warning**（`sections/header.liquid` 设置项过多、`snippets/divider.liquid` 文档参数未使用、`snippets/meta-pixel.liquid` 引用外部资源），均为 Horizon 基础主题自带，与 Purevell 定制无关。

## 来源与授权

主题由 `~/Developer/E-commerce`（SnapMart 工作区）内的 PUREVELL 主题迁移而来，迁移明细见 [docs/MIGRATION.md](docs/MIGRATION.md)。

基础主题 Horizon 版权归 Shopify 所有。本仓库仅用于 PUREVELL 自有店铺，不对外分发主题文件。
