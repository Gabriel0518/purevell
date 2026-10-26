# 迁移记录

**迁移时间**：2026-10-26（Asia/Shanghai）
**操作**：把寄居在 SnapMart 工作区里的 PUREVELL 独立站资源独立成一个仓库。

## 背景

PUREVELL 主题此前放在 `~/Developer/E-commerce/purevell`，占位素材放在 `~/Developer/E-commerce/purevell-mock`，两者都被该仓库的 `.git/info/exclude` 排除，因此**从未进入任何 Git 仓库**，也没有远端备份。本次迁移把它们独立到 `~/Developer/purevell` 并推送到 GitHub。

## 来源 → 目标

| 来源 | 目标 | 文件数 | 大小 |
| --- | --- | --- | --- |
| `~/Developer/E-commerce/purevell`（Shopify 主题） | `~/Developer/purevell/`（仓库根 = 主题根） | 499 | 7.0 MB |
| `~/Developer/E-commerce/purevell-mock`（设计占位图） | `~/Developer/purevell/design/mockups/` | 11 | 16 MB |

新增文件（非迁移内容）：

- `README.md` — 项目说明、目录结构、命令、定制点索引
- `.gitignore`、`.shopifyignore` — 忽略本地状态与不随主题上传的路径
- `docs/MIGRATION.md` — 本文件
- `design/mockups/README.md` — 占位图清单与规格

## 校验结果

- **逐文件 SHA-256 比对**：主题 499/499、占位图 11/11 与源目录完全一致（无丢失、无改动）。
- **JSON 语法**：75 个 `.json` 文件全部可解析（`settings_data.json` 与 locale 文件带 Shopify 自动生成的注释头，按 JSONC 剥离注释后校验）。
- **主题完整性**：`layout/theme.liquid`、`config/settings_schema.json`、`config/settings_data.json`、`templates/index.json` 齐备；`sections/`、`blocks/` 中 `{% schema %}` / `{% endschema %}` 标签配对正常。
- **敏感信息扫描**：未发现 `.env`、私钥、Shopify / AWS / Stripe 形态的密钥。
- **冗余文件**：源目录中的 `.DS_Store` 未复制。
- **权限**：统一为目录 `755`、文件 `644`（源目录里部分 `pv-*` 文件为 `600`）。
- **静态检查**：`shopify theme check` 检查 365 个文件，0 错误、7 条 warning（Horizon 基础主题自带，见 README）。

## 未纳入的内容

- `~/Developer/E-commerce` 下其余内容（SnapMart 前端、设计稿、营销素材、工具脚本、Obsidian 配置）与 PUREVELL 无关，保持原状。
- 没有做任何内容改写：主题文件、设置、locale、占位图均为原样搬迁，唯一变化是占位图的目录归属（`purevell-mock/` → `design/mockups/`）。

## 源目录处置

**原目录未删除**，以避免误删。确认新仓库正常后，如需清理：

```bash
rm -rf ~/Developer/E-commerce/purevell ~/Developer/E-commerce/purevell-mock
# 同时删除 ~/Developer/E-commerce/.git/info/exclude 中对应的两行：
#   /purevell/
#   /purevell-mock/
```

## Git

- 远端：<https://github.com/Gabriel0518/purevell>（private）
- 分支：`main`
- 初始提交：见 `git log -1`

> 选择 private 是因为 Horizon 基础主题版权归 Shopify，且仓库包含品牌店铺配置；如需公开，请先确认授权范围。

## 后续建议

1. 连接店铺验证：`shopify auth login` → `shopify theme dev --store <store>.myshopify.com`。
2. 在 GitHub 上补一份 PR 模板与 `theme check` CI（仅主题改动时运行）。
3. 用正式拍摄的素材替换 `design/mockups/*.png` 与 `assets/pv-*.jpg` 占位图。
4. 若后续要接 Shopify CLI 自动部署，再补 `.github/workflows/theme-deploy.yml` 与 store 凭据（用 Secrets 保存，不要入库）。
