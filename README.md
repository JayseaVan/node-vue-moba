# node-vue-moba

基于Vue、Node.js(Express)、MongoDB搭建的王者荣耀手机端官网和后台管理系统

参考 [Bilibili 全栈之巅](https://space.bilibili.com/341919508) 教程开发 [(课程地址)](https://www.bilibili.com/video/BV1A4411Y7fi) ，并在此基础上完善了功能和细节，首先感谢大神的教程！

### 环境准备
-   Node.js v16.16.0.
-   MongoDB v6.0.1.

### 安装MongoDB数据库

进入[官网](https://www.mongodb.com/try/download/community)下载，版本是6.0.1，平台是Windows，安装包为msi格式

### 项目开发

1.  web端
    
    ```
    web文件夹下
    npm install
    npm run serve
    ```
    
2.  admin端
    
    ```
    admin文件夹下
    npm install
    npm run serve
    ```
    
3.  server端
    
    ```
    server文件夹下
    npm install
    npm run dev
    ```

### 后台管理系统

-   vue-router单页面应用
-   页面使用 element-ui 搭建
-   编辑页面：对各个模型（表）的操作
-   列表页面：展示各个模型（表）的数据
-   管理菜单选项添加动态渲染
-   客户端路由守卫 (beforeEach, meta)

### 服务接口端

-   使用MongoDB储存, Mongoose操作数据库模型
-   通用 CRUD(增删改查) 接口
-   添加登录jwt校验
-   管理员账号管理 (bcrypt)
-   接口添加登录权限验证
-   接口添加用户操作权限验证

### 移动端网站

-   使用scss书写样式
-   通用flex布局样式定义
-   构建可复用的 卡片组件 (card)
-   使用精灵图片 (sprite)、使用字体图标 (iconfont)
-   前端页面准备与后台数据录入

### 页面预览

![image](/public/image/page.jpg)


### To Do List

-   项目打包部署，发布线上服务器
-   新建页面，完善页面功能
-   浏览器兼容问题，移动端适配
-   浏览器渲染性能优化
-   根据此项目结构搭建个人博客......
