# CLAUDE.md - Vafast 项目规则

> 此文件为 Claude AI 提供项目特定指令。

## 项目信息

- **框架**: Vafast - 高性能、类型安全的 TypeScript Web 框架
- **语言**: TypeScript 5.x
- **运行时**: Node.js 20+

## 核心原则

1. **类型安全优先** - 使用 TypeBox 定义 schema，类型自动推断
2. **函数式风格** - 使用函数而非 class
3. **Go 风格错误处理** - 返回 `{ data, error }` 而非抛出异常
4. **模块化** - 功能拆分为独立函数

## 路由定义

```typescript
import { defineRoute, defineRoutes, Type } from 'vafast'

// 必须使用 defineRoute 包装
defineRoute({
  method: 'GET',
  path: '/users',
  name: 'get_users',           // snake_case，用于 AI tools
  description: '获取用户列表',   // 中文描述
  schema: {
    query: Type.Object({
      page: Type.Number(),
      limit: Type.Optional(Type.Number()),
    })
  },
  handler: ({ query }) => ({
    users: [],
    page: query.page,
  })
})
```

## Schema 定义（TypeBox）

```typescript
import { Type } from 'vafast'

// 基础类型
Type.String()
Type.Number()
Type.Boolean()
Type.Null()

// 可选
Type.Optional(Type.String())

// 对象
Type.Object({
  id: Type.String(),
  name: Type.String(),
})

// 数组
Type.Array(Type.String())

// 联合
Type.Union([Type.String(), Type.Number()])

// 格式验证
Type.String({ format: 'email' })
Type.String({ format: 'uuid' })
Type.String({ format: 'date-time' })
```

## 中间件

```typescript
import { defineMiddleware } from 'vafast'

// 泛型参数定义注入的上下文类型
const authMiddleware = defineMiddleware<{ user: User }>(async (req, next) => {
  const token = req.headers.get('Authorization')
  const user = await verifyToken(token)
  return next({ user })  // 注入到 handler 上下文
})

// 使用
defineRoute({
  method: 'GET',
  path: '/profile',
  middleware: [authMiddleware],
  handler: ({ user }) => ({  // user 类型自动推断
    id: user.id,
    name: user.name,
  })
})
```

## SSE 流式响应

```typescript
import { createSSEHandler } from 'vafast'

defineRoute({
  method: 'GET',
  path: '/stream',
  handler: createSSEHandler(async function* (ctx) {
    yield { event: 'start', data: { message: '开始' } }
    
    for (let i = 0; i < 10; i++) {
      yield { data: { count: i } }
      await sleep(100)
    }
    
    yield { event: 'end', data: { message: '完成' } }
  })
})
```

## 嵌套路由

```typescript
defineRoute({
  path: '/api/v1',
  middleware: [apiKeyMiddleware],
  children: [
    defineRoute({
      method: 'GET',
      path: '/users',
      handler: () => []
    }),
    defineRoute({
      method: 'POST',
      path: '/users',
      schema: { body: CreateUserSchema },
      handler: ({ body }) => ({ ...body, id: '1' })
    })
  ]
})
```

## 禁止事项

1. ❌ **不要使用 `as` 类型断言**（除非调用第三方库）
2. ❌ **不要使用 class**
3. ❌ **不要手动 JSON.parse/stringify**
4. ❌ **不要创建统一的类型导出文件**（类型定义在使用处）
5. ❌ **不要使用 try-catch 包裹所有代码**
6. ❌ **不要使用 `any` 类型**

## 回复规范

- 使用中文回复
- 代码注释使用中文
- 生成的代码必须通过 TypeScript 严格模式检查
