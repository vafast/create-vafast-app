# create-vafast-app

> 快速创建高性能、类型安全的 Vafast 应用。

👉 **Star Vafast on GitHub**:
[https://github.com/vafast/vafast](https://github.com/vafast/vafast)

---

## 🚀 快速开始

```bash
npx create-vafast-app
```

或者使用 npm/pnpm/yarn：

```bash
npm create vafast-app
pnpm create vafast-app
yarn create vafast-app
```

---

## 📁 生成内容

一个开箱即用的 Vafast 项目：

```
my-vafast-app/
├── .cursor/
│   └── rules/
│       ├── vafast.mdc        # Cursor AI 规则
│       └── typescript.mdc    # TypeScript 规范
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot 指令
├── src/
│   └── index.ts              # 应用入口
├── AGENTS.md                 # AI 开发指南（OpenAI Codex）
├── CLAUDE.md                 # Claude 项目规则
├── package.json              # 依赖和脚本配置
└── tsconfig.json             # TypeScript 配置
```

## 🤖 内置 AI 开发规则

让 Cursor、GitHub Copilot、Claude 等 AI 工具更懂 Vafast：

| 文件 | 支持的 AI 工具 |
|------|---------------|
| `.cursor/rules/*.mdc` | Cursor |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `AGENTS.md` | OpenAI Codex, GitHub Copilot Agent |
| `CLAUDE.md` | Claude |

AI 将自动学习：
- Vafast 路由定义模式
- TypeBox schema 用法
- 中间件编写规范
- SSE 流式响应
- 错误处理最佳实践

示例输出：

```bash
✔ Project folder: › my-vafast-app

✅ Vafast app created in 'my-vafast-app'

Next steps:

  cd my-vafast-app
  npm install
  npm run dev
```

---

## 🌐 为什么选择 Vafast？

Vafast 是一个高性能、类型安全的 TypeScript Web 框架：

* ⚡ **高性能** - 比 Express/Hono 快约 1.8x
* 🔒 **类型安全** - 完整的 TypeScript 类型推断
* 🎯 **Schema 验证** - 内置 TypeBox 支持，声明式验证
* 🧩 **灵活中间件** - 可组合的中间件架构
* 📦 **零配置** - 开箱即用

---

## 📦 全局安装（可选）

```bash
npm install -g create-vafast-app
```

然后运行：

```bash
create-vafast-app
```

---

## 📜 License

MIT
