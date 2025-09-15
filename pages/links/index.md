---
title: 友情链接
keywords: 链接
description: 以及穗香咖啡馆的各位！
links: https://api.kemiaosw.top/links.json
links_global: https://link-app.20050815.xyz/api/links?status=approved
aplayer: false
medium_zoom: false
---

# 友情链接

<!-- <meting-js
 id="2005302493"
 server="netease"
 type="song"
 theme="#F2BC57">
</meting-js> -->

友链需要一定时间来加载，如果无法显示，请确认 `api.kemiaosw.top` 是否能够正常访问。

---

## 内页友链

此处的友链仅显示在本页面上。

<FriendLinks :links="frontmatter.links" :random="frontmatter.random" />

## 全站友链

此处友链不仅会显示在本页，也会显示在全站边栏部分。

<FriendLinks :links="frontmatter.links_global" :random="frontmatter.random" />

---

## 提交友链

来交换友链吧！在交换友链之前，你需要先添加我的链接，并在此之前与我有过一定的互动。

我的信息如下：

- 链接：https://blog.20050815.xyz
- 头像（128x，WebP）：https://www.gravatar.com/avatar/7614b285e795f21e780247019c4e15c4?s=256
  - Gravatar E-Mail Hash：`7614b285e795f21e780247019c4e15c4`
- 站点名称：喵洛阁
- 昵称：克喵爱吃卤面
<!-- - 主题色：`#F2BC57` -->
- 描述：愿你看清一切真相后，依旧热爱你的家人和朋友。

```json
{
    "url": "https://blog.20050815.xyz", // 链接
    "avatar": "https://www.gravatar.com/avatar/7614b285e795f21e780247019c4e15c4?s=256", // 头像
    "name": "克喵爱吃卤面", // 昵称
    "blog": "喵洛阁", // 站点名称
    "desc": "愿你看清一切真相后，依旧热爱你的家人和朋友。" // 一句话介绍
}
```

如果想要提交友链，请移步[这里](https://github.com/kemiaofxjun/Friends)按照说明提交 Pull Request。如果你的友链为全站链接，我会同样将你的小站同时放置在本页与全站页脚。