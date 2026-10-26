# PUREVELL 设计占位图（mockups）

11 张设计阶段的占位素材：纯色底 + 细密竖纹的针织纹理。正式拍摄素材到位前，用它们撑起首页、分类图块和商品卡的版式，避免出现空框。

- **不参与主题上传**：`design/` 已列入 `.shopifyignore`，`shopify theme push` 时忽略。
- 主题实际引用的是压缩后的 `assets/pv-*.jpg`；替换正式素材时两边都要更新，并保持宽高比。

## 清单

| 文件 | 尺寸 | 比例 | 平均色 | 建议用途 |
| --- | --- | --- | --- | --- |
| `hero.png` | 2400×1400 | 12:7 | `#3A3F20` 橄榄绿 | 首页 Hero 横幅（对应 `assets/pv-hero.jpg`） |
| `essential-crewneck.png` | 1200×1500 | 4:5 | `#CDBAA0` 燕麦色 | 商品卡 / 商品画廊 |
| `ribbed-cardigan.png` | 1200×1500 | 4:5 | `#B8A88E` 浅驼 | 商品卡 / 商品画廊 |
| `cropped-cardigan.png` | 1200×1500 | 4:5 | `#E3D6C3` 米白 | 商品卡 / 商品画廊 |
| `throw-blanket.png` | 1200×1500 | 4:5 | `#D9CAB6` 奶油 | 家居类图块（对应 `pv-tile-home.jpg`） |
| `lounge-set.png` | 1200×1500 | 4:5 | `#A8968A` 灰褐 | 商品卡 / 商品画廊 |
| `travel-wrap.png` | 1200×1500 | 4:5 | `#9AA07B` 橄榄灰 | 商品卡 / 商品画廊 |
| `oversized-turtleneck.png` | 1200×1500 | 4:5 | `#8B8477` 暖灰 | 商品卡 / 商品画廊 |
| `ribbed-beanie.png` | 1200×1500 | 4:5 | `#7B3939` 砖红 | 配饰类图块（对应 `pv-tile-accessories.jpg`） |
| `cable-knit-sweater.png` | 1200×1500 | 4:5 | `#6D5135` 深棕 | 商品卡 / 商品画廊 |
| `cashmere-gloves.png` | 1200×1500 | 4:5 | `#3A3F20` 橄榄绿 | 商品卡 / 商品画廊 |

## 与主题内占位图的对应关系

主题内 `assets/` 有一组小尺寸占位图，供 Liquid 在没有选中图片时回退使用：

| 主题内文件 | 尺寸 | 使用位置 |
| --- | --- | --- |
| `pv-hero.jpg` | 1920×1080 | `pv-hero-slider` 第 1 屏回退图 |
| `pv-edit-1.jpg`、`pv-edit-2.jpg` | 1200×400 | `pv-hero-slider` 第 2、3 屏回退图 |
| `pv-edit-3.jpg` | 600×800 | `pv-hero-slider` 第 4 屏、`pv-image-tiles` 第四个图块回退图 |
| `pv-tile-knitwear.jpg` | 600×800 | `pv-image-tiles` 首个图块回退图 |
| `pv-tile-accessories.jpg` | 600×800 | `pv-image-tiles` 第二个图块回退图 |
| `pv-tile-home.jpg` | 800×1067 | `pv-image-tiles` 第三个图块回退图（首页当前只配了 2 块） |
| `pv-promo.jpg` | 600×800 | `pv-split-promo` 未选图时的回退图 |

这组 jpg 与 PNG 母版并非逐张等比缩放（裁剪比例不同），所以替换素材时按上表的实际用途分别出图。

## 出图建议

- 商品图统一 4:5（1200×1500 起），首屏用 `fetchpriority="high"` 的那张单独出 2x。
- Hero 按 12:7 出图，主体落在中间安全区，移动端会裁切成更竖的比例。
- 导出 jpg（质量 80–85）放 `assets/`，PNG 母版留在这里，避免仓库体积继续膨胀。
