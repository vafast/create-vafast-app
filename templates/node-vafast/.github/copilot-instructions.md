# GitHub Copilot 指令 - Vafast 项目

## 项目框架

这是一个 **Vafast** TypeScript Web API 项目。Vafast 是一个高性能、类型安全的 Web 框架。

## 代码风格

- 使用 TypeScript 严格模式
- 优先使用函数式编程，避免 class
- 使用 2 空格缩进
- 使用单引号
- 不使用分号

## 路由定义模式

生成路由时，请使用以下模式：

```typescript
import { defineRoute, defineRoutes, Type } from 'vafast'

defineRoute({
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: '/path',
  name: 'operation_name',      // snake_case，用于 AI tools
  description: '接口描述',      // 中文描述
  schema: {
    query: Type.Object({...}),  // GET 参数
    body: Type.Object({...}),   // POST/PUT 请求体
    params: Type.Object({...}), // 路径参数
  },
  handler: (ctx) => {
    // 返回对象，自动序列化为 JSON
    return { ... }
  }
})
```

## Schema 定义

使用 TypeBox 而非手写接口：

```typescript
// ✅ 正确
const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
})

// ❌ 避免
interface User {
  id: string
  name: string
  email: string
}
```

## 中间件模式

```typescript
import { defineMiddleware } from 'vafast'

const authMiddleware = defineMiddleware<{ user: User }>(async (req, next) => {
  const user = await verifyToken(req)
  return next({ user })
})
```

## SSE 流式响应

```typescript
import { createSSEHandler } from 'vafast'

createSSEHandler(async function* (ctx) {
  yield { event: 'start', data: {} }
  yield { data: { text: 'chunk' } }
  yield { event: 'end', data: {} }
})
```

## 禁止事项

- 不要使用 `as` 类型断言
- 不要使用 `any` 类型
- 不要手动 JSON.parse/stringify
- 不要使用 class 定义路由
- 不要创建统一的类型导出文件
