# SIXOSN Komari Glassmorphism

SIXOSN Komari Glassmorphism 是 [`SIXOSN/komari`](https://github.com/SIXOSN/komari) 的默认主题，同时内嵌与定制服务端配套的管理前端。

![Preview](docs/preview.png)

## 项目关系说明

本仓库基于 [`sanrokamlan-prog/komari-theme-Glassmorphism`](https://github.com/sanrokamlan-prog/komari-theme-Glassmorphism) 开发，由 SIXOSN 独立维护，不属于原项目的官方发行版。许可证及依法需要保留的署名仍保存在 [LICENSE](./LICENSE) 与 Git 历史中。

此主题针对 SIXOSN Komari 的接口和安全模型进行适配，不保证兼容其他 Komari 发行版。

## SIXOSN 定制内容

- 作为 SIXOSN Komari 的内置默认主题。
- 按每台服务器的重置日、时间和 IANA 时区统计当前流量周期。
- 流量配额、节点卡片、列表、首页总览、对比和详情页统一使用周期数据。
- Metric Store 不可用时安全回退累计计数，避免页面失效。
- 内嵌 SIXOSN 管理前端，包含流量周期配置。
- 移除远程命令、Web SSH、网页终端、文件管理及文件传输界面与静态资源。

## 当前版本

- 主题版本：`3.3.8`
- 配套服务端：`SIXOSN/komari 1.5.0-fix2`
- 管理前端：`SIXOSN/komari-web`

## 本地开发

建议使用 Bun 1.2 或更高版本：

```bash
bun install
bun run lint
bun run build
```

生产构建会生成可上传到 Komari 的主题压缩包。核心仓库构建时会自动拉取本仓库的定制分支并将其规范化为默认主题。

## 配套仓库

- 服务端：[`SIXOSN/komari`](https://github.com/SIXOSN/komari)
- Agent：[`SIXOSN/komari-agent`](https://github.com/SIXOSN/komari-agent)
- 管理前端：[`SIXOSN/komari-web`](https://github.com/SIXOSN/komari-web)
