# YZY 项目全栈开发框架

本项目是一个基于 Vue 3 + Tailwind CSS + Django + MySQL 搭建的全栈系统。包含美观的用户端界面、集成的 API 请求机制以及功能强大的 Django SimpleUI 中文管理后台。

---

## 项目结构

```text
yzy/
├── AGENTS.md             # 项目开发规范与限制
├── README.md             # 本说明文档
├── backend/              # 后端项目 (Django 6.0)
│   ├── manage.py
│   ├── backend/          # 后端配置
│   │   ├── settings.py   # 数据库、SimpleUI、CORS配置
│   │   └── urls.py       # 主路由
│   └── api/              # RESTful API 子应用
│       ├── models.py     # 数据库模型
│       ├── serializers.py# 序列化器
│       ├── views.py      # RESTful API 视图
│       └── urls.py       # API 子路由
└── frontend/             # 前端项目 (Vue 3 + Vite + Tailwind CSS v4)
    ├── index.html
    ├── package.json
    ├── vite.config.js    # Vite配置与开发环境代理
    └── src/
        ├── main.js       # 入口文件
        ├── App.vue       # 根组件
        ├── router/       # 路由配置
        ├── utils/        # Axios网络请求工具
        └── views/        # 前端视图页面 (Home, Login)
```

---

## 启动指南

### 1. 后端配置与启动

#### 1.1 准备 MySQL 数据库
请在您的本地 MySQL 中创建一个名为 `yzy_db` 的数据库：
```sql
CREATE DATABASE yzy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 1.2 配置数据库连接
打开 `backend/backend/settings.py`，默认的数据库连接信息如下：
- **数据库名称**：`yzy_db`
- **用户名**：`root`
- **密码**：`yinzhaoyuV587`
- **地址**：`127.0.0.1`
- **端口**：`3306`

您可以直接修改 `settings.py` 中的相应配置，或者在系统环境变量中设置 `DB_NAME`、`DB_USER`、`DB_PASSWORD`、`DB_HOST`、`DB_PORT`。

#### 1.3 运行数据库迁移与创建超级管理员（已自动为您运行并完成）
后端初始化时，我们已为您成功配置并执行了以下命令：
- **数据库迁移**：已运行 `python manage.py migrate` 将模型同步至本地 MySQL 的 `yzy_db`。
- **超级管理员**：已运行 `createsuperuser` 成功创建默认管理员账号：
  - **用户名**：`admin`
  - **密码**：`admin`


#### 1.4 启动后端服务
```bash
python manage.py runserver 127.0.0.1:8000
```
启动后可通过浏览器访问中文后台：[http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

---

### 2. 前端配置与启动

#### 2.1 安装依赖
在 `frontend` 目录下执行：
```bash
npm install
```

#### 2.2 启动前端开发服务器
```bash
npm run dev
```
前端默认运行在：[http://localhost:3000](http://localhost:3000)（我们在 `vite.config.js` 中配置了端口为 `3000` 并设置了代理，对 `/api` 的请求会自动转发到后端的 `http://127.0.0.1:8000`）。

---

## 接口规范

所有的 API 路由和书写方式均遵循 **RESTful** 规范：
- 状态检测：`GET /api/status/`
- 系统消息列表：`GET /api/messages/`
- 创建消息：`POST /api/messages/`
- 获取消息详情：`GET /api/messages/<id>/`
- 更新消息：`PUT /api/messages/<id>/` 或 `PATCH /api/messages/<id>/`
- 删除消息：`DELETE /api/messages/<id>/`
