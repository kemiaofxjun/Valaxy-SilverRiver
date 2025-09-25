---
title: 关于github-issues当做动态的想法
description: 起源于在不同博客游览间，看到了一篇文章，感觉很有搞头，然后到了博主的GitHub仓库，然后有了些感受。
date: 2025-09-24 21:25:25
updated: 2025-09-24 21:25:25
image: https://img.314926.xyz/images/2025/09/24/github-issues.webp
categories: [技术分享]
tags: [教程, 说说, Github-issues]
recommend: 7
---

> 起源于在不同博客游览间，看到了一篇[文章](https://lawtee.com/article/add-live-talking-page-for-static-blog/)，感觉很有搞头，然后到了博主的[GitHub仓库](https://github.com/h2dcc/moments)，然后有了些感受。

## 优点

有不少的博客基于github-issues，包括[etheral](https://github.com/wallleap/ethereal)、[Gmeek](https://github.com/Meekdai/Gmeek)等等，当然，除了当博客，你也可以使用其来搞博客。

>  很好的一种博客写作方式，理论上GitHub不倒，这个方式可以一直使用。

> 手机上有GitHub的APP，你可以比较简单地在手机上发布动态。

> 这种方式可以被用来在各种博客里使用，包括Hugo、astro等等。

大致的工作流如下:

```yml
// .github/workflows/issue.yml

name: Trigger Empty Commit on Issue Update

on:
  issue_comment:
    types: [created, edited]
  workflow_dispatch:  # 手动触发入口

jobs:
  trigger-empty-commit:
    runs-on: ubuntu-latest
    steps:
      - name: Check trigger type and prepare commit message
        id: check-trigger
        run: |
          # 处理手动触发
          if [[ "${{ github.event_name }}" == "workflow_dispatch" ]]; then
            echo "should_trigger=true" >> $GITHUB_OUTPUT
            echo "commit_msg='[Manual] Trigger update from moments/issues/1'" >> $GITHUB_OUTPUT
          # 处理issue评论事件
          elif [ "${{ github.event.issue.number }}" -eq 1 ]; then
            echo "should_trigger=true" >> $GITHUB_OUTPUT
            echo "commit_msg='Trigger update from moments/issues/1'" >> $GITHUB_OUTPUT
          else
            echo "should_trigger=false" >> $GITHUB_OUTPUT
            echo "commit_msg=''" >> $GITHUB_OUTPUT
          fi

      - name: Trigger empty commit in lawtee.github.io
        if: steps.check-trigger.outputs.should_trigger == 'true'
        uses: actions/github-script@v6
        env:
          PAT: ${{ secrets.PAT }}
        with:
          script: |
            const { execSync } = require('child_process');
            const repo = 'h2dcc/lawtee.github.io';
            const token = process.env.PAT;
      
            // 从步骤输出获取提交信息
            const commitMsg = `${{ steps.check-trigger.outputs.commit_msg }}`;

            try {
              const repoUrl = `https://x-access-token:${token}@github.com/${repo}.git`;
              execSync(`git clone ${repoUrl}`, { stdio: 'inherit' });
              process.chdir('lawtee.github.io');

              execSync('git config user.name "github-actions[bot]"', { stdio: 'inherit' });
              execSync('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"', { stdio: 'inherit' });

              // 安全执行空提交
              execSync(`git commit --allow-empty -m "${commitMsg.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
              execSync(`git push ${repoUrl} master`, { stdio: 'inherit' });
              console.log('✅ Empty commit pushed successfully!');
            } catch (error) {
              console.error('❌ Error:', error.message);
              process.exit(1);
            }
```

你需要的，是搞个公开的仓库(私有仓库不能使用非远程图片)，然后准备上述的工作流，然后**在 Github 账号设置 `Personal access tokens` 中添加一个 token , 勾选 `repo` 权限，复制到说说仓库 `secrets and variables - action` 中，名称为 `PAT`** 。

## 发布说说

这一步需要的是开启一个issue，然后在这个issue里面不断发布评论来当做**动态**，然后就是把这个issue的链接如[https://github.com/h2dcc/moments/issues/1](https://github.com/h2dcc/moments/issues/1%E2%80%B8)，改为类似[https://api.github.com/repos/microsoft/vscode/issues/519/comments](https://api.github.com/repos/microsoft/vscode/issues/519/comments%E2%80%B8)，如果你要在前端展示，你需要一个密钥，要有`repo`权限，你才能正常使用，否则会有较大的限制。关于这个，我觉得要在cloudflare里搞个worker然后再worker的环境变量里添加上面的密钥，大致worker代码如下：

```js
// CF Worker 入口
export default {
  async fetch(req, env) {
    return await handle(req, env);
  }
};

async function handle(req, env) {
  const url = new URL(req.url);

  // 只代理 /api/comments
  if (url.pathname !== '/api/comments') {
    return new Response('Not Found', { status: 404 });
  }

  const upstream = 'https://api.github.com/repos/microsoft/vscode/issues/519/comments';

  const res = await fetch(upstream, {
    headers: {
      'Authorization': 'token ' + env.GH_TOKEN, // ✅ 正确读取环境变量
      'User-Agent': 'CF-Worker-Giscus-Proxy'
    }
  });

  const headers = new Headers(res.headers);
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers
  });
}
```
然后再搞个自定义域名，然后在后面加后缀`/api/comments`，你就能比较不受限制的观看动态了，

## 前端
接下来就是我自己搞的一个html的简单[前端](https://github.com/zsxsw/github-issues-moments)，靠着AI完善了一下，可以参考参考: 
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <link rel="icon" type="image/png"
    href="https://img.314926.xyz/images/2025/09/20/zsx-avatar.webp " 
    sizes="32x32">
    <meta charset="UTF-8">
    <title>钟神秀的瞬间</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            --bg: #f5f5f5;
            --fg: #333333;
            --card: #ffffff;
            --link: #576b95;
            --border: #e1e1e1;
            --avatar-border: #f0f0f0;
            --time-color: #888888;
            --like-color: #ff2442;
            --comment-bg: #f7f7f7;
            --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            --active-page-bg: #576b95;
            --active-page-fg: #ffffff;
            --action-btn-color: #7d7d7d;
            --divider-color: #f0f0f0;
            --header-image-height: 180px;
            --content-max-width: 600px;
        }
        [data-theme="dark"] {
            --bg: #1a1a1a;
            --fg: #e6e6e6;
            --card: #242424;
            --link: #7d9fd3;
            --border: #3a3a3a;
            --avatar-border: #3a3a3a;
            --time-color: #a0a0a0;
            --like-color: #ff5c7a;
            --comment-bg: #2d2d2d;
            --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            --active-page-bg: #7d9fd3;
            --active-page-fg: #ffffff;
            --action-btn-color: #a0a0a0;
            --divider-color: #3a3a3a;
            --header-image-height: 200px;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background: var(--bg);
            color: var(--fg);
            line-height: 1.6;
            transition: background .3s, color .3s;
            padding-bottom: 40px;
        }
        a {
            color: var(--link);
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: var(--card);
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: var(--shadow);
        }
        .nav-left {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 18px;
        }
        .icon {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
        #theme-toggle {
            cursor: pointer;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--fg);
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .header-image {
            width: 100%;
            max-width: var(--content-max-width);
            height: var(--header-image-height);
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            position: relative;
            overflow: hidden;
            margin: 0 auto 15px;
            border-radius: 12px;
            border: 1px solid var(--border);
        }
        .header-image::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('https://img.314926.xyz/images/2025/09/22/20250922193025414.webp ') center/cover;
            opacity: 0.9;
        }
        .header-title {
            position: absolute;
            left: 20px;
            bottom: 20px;
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            z-index: 2;
        }
        .header-info {
            position: absolute;
            right: 20px;
            bottom: 20px;
            color: white;
            z-index: 2;
            cursor: pointer;
            font-size: 20px;
        }
        @media (max-width: 640px) {
            .header-image {
                border-radius: 0;
                margin-bottom: 10px;
            }
            :root {
                --header-image-height: 160px;
            }
            [data-theme="dark"] {
                --header-image-height: 180px;
            }
        }
        .info-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .info-content {
            background: var(--card);
            padding: 20px;
            border-radius: 12px;
            max-width: 80%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            position: relative;
        }
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
        }
        main {
            max-width: var(--content-max-width);
            margin: 0 auto;
            padding: 0 10px;
            width: 100%;
        }
        .moment-article {
            background: var(--card);
            border-radius: 12px;
            padding: 0;
            margin-bottom: 15px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            overflow: hidden;
        }
        .article-header {
            display: flex;
            align-items: center;
            padding: 12px 15px;
        }
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 12px;
            border: 2px solid var(--avatar-border);
            object-fit: cover;
        }
        .user-info {
            flex: 1;
        }
        .user-name {
            font-weight: 500;
            font-size: 16px;
            margin-bottom: 2px;
        }
        .post-time {
            font-size: 12px;
            color: var(--time-color);
        }
        .moment-content {
            padding: 0 15px 15px 15px;
            margin-left: 52px;
            margin-top: -10px;
            font-size: 15px;
            line-height: 1.5;
        }
        .moment-content p {
            margin-bottom: 10px;
        }
        .moment-content pre {
            background: var(--bg);
            padding: 12px;
            border-radius: 6px;
            overflow: auto;
            font-size: 14px;
            margin: 10px 0;
        }
        .moment-content blockquote {
            border-left: 3px solid var(--border);
            padding-left: 12px;
            margin: 10px 0;
            color: var(--fg);
            opacity: .8;
            font-size: 14px;
            background: var(--comment-bg);
            border-radius: 0 6px 6px 0;
            padding: 8px 12px;
        }
        .moment-content code {
            background-color: var(--bg);
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 14px;
        }
        .moment-content img {
            max-width: 100%;
            border-radius: 6px;
            margin: 8px 0;
        }
        .error, .no-content {
            text-align: center;
            margin-top: 40px;
            font-size: 16px;
            color: var(--time-color);
        }
        .pagination {
            display: flex;
            justify-content: center;
            margin: 20px 0;
            gap: 8px;
        }
        .page-btn {
            padding: 6px 12px;
            border: 1px solid var(--border);
            background: var(--card);
            color: var(--fg);
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        .page-btn:hover {
            background: var(--bg);
        }
        .page-btn.active {
            background: var(--active-page-bg);
            color: var(--active-page-fg);
            border-color: var(--active-page-bg);
        }
        .page-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .giscus-container {
            max-width: var(--content-max-width);
            margin: 30px auto 0 auto;
            padding: 0 10px;
        }
        .loading {
            display: flex;
            justify-content: center;
            padding: 20px;
        }
        .loading-spinner {
            width: 24px;
            height: 24px;
            border: 3px solid var(--border);
            border-top-color: var(--link);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        /* 右下角编辑按钮 */
        .edit-btn {
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--card);
            color: var(--fg);
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            transition: all .3s;
            z-index: 999;
        }
        .edit-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }
        /* 手机端缩小一点 */
        @media (max-width: 640px) {
            .edit-btn {
                width: 44px;
                height: 44px;
                font-size: 18px;
                right: 16px;
                bottom: 16px;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-left">
            <svg class="icon" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                         0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
                         1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                         0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
                         1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0
                         3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>钟神秀的瞬间</span>
        </div>
        <button id="theme-toggle" aria-label="切换主题">
            <span id="theme-icon">🌙</span>
            <span>切换主题</span>
        </button>
    </nav>

    <div class="header-image">
        <div class="header-title">即刻短文</div>
        <div class="header-info" id="info-button">❗</div>
    </div>

    <div class="info-modal" id="info-modal">
        <div class="info-content">
            <div class="close-modal" id="close-modal">×</div>
            <h3>钟神秀的瞬间记录</h3>
            <p>这里收录了我的生活随笔、技术思考和灵感闪现。每一段文字都是时光的切片，记录当下的真实感受。</p>
        </div>
    </div>

    <main id="main-container">
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    </main>

    <div id="pagination-container" style="display: none;"></div>

    <div class="giscus-container"></div>

    <a href="https://github.com/zsxsw/github-issues-moments/issues/1" target="_blank" class="edit-btn" title="添加/编辑说说">✏️</a>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js "></script>
    <script>
        /* ---------- 主题切换 + Giscus 重载 ---------- */
        const toggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const html = document.documentElement;

        function loadGiscus(theme) {
            const container = document.querySelector('.giscus-container');
            container.innerHTML = '';
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js ';
            script.async = true;
            script.setAttribute('crossorigin', 'anonymous');
            script.setAttribute('data-repo', 'zsxsw/github-issues-moments');
            script.setAttribute('data-repo-id', 'R_kgDOP0jWOA');
            script.setAttribute('data-category', 'Announcements');
            script.setAttribute('data-category-id', 'DIC_kwDOP0jWOM4Cvv6S');
            script.setAttribute('data-mapping', 'pathname');
            script.setAttribute('data-strict', '0');
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'top');
            script.setAttribute('data-lang', 'zh-CN');
            script.setAttribute('data-theme', theme);
            container.appendChild(script);
        }

        (function initTheme() {
            const saved = localStorage.getItem('theme');
            const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = (saved === 'dark' || (!saved && preferDark)) ? 'dark' : 'light';
            html.setAttribute('data-theme', initialTheme);
            themeIcon.textContent = initialTheme === 'dark' ? '☀️' : '🌙';
            loadGiscus(initialTheme);
        })();

        toggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
            loadGiscus(next);
        });

        /* ---------- 信息模态框 ---------- */
        const infoButton = document.getElementById('info-button');
        const infoModal = document.getElementById('info-modal');
        const closeModal = document.getElementById('close-modal');
        infoButton.addEventListener('click', () => infoModal.style.display = 'flex');
        closeModal.addEventListener('click', () => infoModal.style.display = 'none');
        infoModal.addEventListener('click', e => {
            if (e.target === infoModal) infoModal.style.display = 'none';
        });

        /* ---------- 数据加载 & 分页 ---------- */
        const container = document.getElementById('main-container');
        const paginationContainer = document.getElementById('pagination-container');
        const url = 'https://example.com/api/comments '; /* 替换为你的 API URL */
        let allComments = [];
        let currentPage = 1;
        const itemsPerPage = 10;

        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('User-Agent', 'Hugo Static Site Generator');

        fetch(url, { headers })
            .then(r => {
                if (!r.ok) throw new Error('网络错误 ' + r.status);
                return r.json();
            })
            .then(list => {
                if (!Array.isArray(list) || list.length === 0) {
                    container.innerHTML = '<p class="no-content">暂无动态</p>';
                    return;
                }
                allComments = list.reverse();
                initPagination(allComments.length);
                displayPage(1);
            })
            .catch(err => {
                container.innerHTML = `<p class="error">⚠️ 无法获取动态：${err.message}</p>`;
            });

        function initPagination(totalItems) {
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            if (totalPages <= 1) {
                paginationContainer.style.display = 'none';
                return;
            }
            let html = `
                <div class="pagination">
                    <button class="page-btn prev-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
            `;
            const max = 5, half = Math.floor(max / 2);
            let start, end;
            if (totalPages <= max) { start = 1; end = totalPages; }
            else if (currentPage <= half + 1) { start = 1; end = max; }
            else if (currentPage >= totalPages - half) { start = totalPages - max + 1; end = totalPages; }
            else { start = currentPage - half; end = currentPage + half; }
            for (let i = start; i <= end; i++) {
                html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
            html += `<button class="page-btn next-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button></div>`;
            paginationContainer.innerHTML = html;
            paginationContainer.style.display = 'block';
        }

        function displayPage(page) {
            const start = (page - 1) * itemsPerPage, end = Math.min(start + itemsPerPage, allComments.length);
            const html = allComments.slice(start, end).map(c => `
                <article class="moment-article">
                    <header class="article-header">
                        <img class="avatar" src="${c.user.avatar_url}" alt="${c.user.login}" onerror="this.src='https://avatars.githubusercontent.com/u/0?s=80&v=4 '">
                        <div class="user-info">
                            <div class="user-name">钟神秀@zsxsw</div>
                            <div class="post-time">${formatTime(c.created_at)}</div>
                        </div>
                    </header>
                    <section class="moment-content">${marked.parse(c.body)}</section>
                </article>
            `).join('');
            container.innerHTML = `<div class="moments-feed">${html}</div>`;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.changePage = function (page) {
            const total = Math.ceil(allComments.length / itemsPerPage);
            if (page < 1 || page > total || page === currentPage) return;
            currentPage = page;
            displayPage(page);
            initPagination(allComments.length);
        };

        function formatTime(dateStr) {
            const date = new Date(dateStr), now = new Date(), diff = (now - date) / 1000;
            if (diff < 60) return '刚刚';
            if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
            if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
            if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`;
            return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
        }
    </script>
</body>
</html>
```

大致就是这样了，以上就是我肤浅的理解，希望能帮到你~