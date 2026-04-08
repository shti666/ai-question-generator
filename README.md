# 智出题 - AI智能出题工具

帮老师 1 分钟生成高质量试卷，告别重复劳动。

## 功能特点

- ✅ 按年级、知识点、难度智能出题
- ✅ 自动生成答案和详细解析
- ✅ 支持重新生成、复制试卷
- ✅ 简洁美观的界面

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动前端

```bash
npm run dev
```

### 3. 启动后端（新终端窗口）

```bash
npm run server
```

### 4. 打开浏览器

访问 http://localhost:3000

## 配置 DeepSeek API（可选）

默认使用模拟数据演示。如需真实 AI 出题：

1. 注册 DeepSeek 账号：https://platform.deepseek.com
2. 获取 API Key
3. 设置环境变量：

```bash
export DEEPSEEK_API_KEY=你的key
npm run server
```

## 技术栈

- **前端**：React + Vite + Tailwind CSS
- **后端**：Express + DeepSeek API
- **部署**：Vercel / 阿里云

## 商业化

- 免费体验：每天 3 次
- 月卡：¥29
- 年卡：¥199

## License

MIT
