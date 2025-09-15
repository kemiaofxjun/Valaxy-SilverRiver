---
title: 相册集
photos:
  - caption: Me
    src: https://img.314926.xyz/images/2025/09/15/kemiaoaclumian.webp
    desc: '我的头像'
  - caption: 饥荒加载
    src: https://img.314926.xyz/images/2025/07/30/jihuangcover.webp
    desc: '饥荒加载'
comment: false
---

<!-- The style of gallery -->
<VAGallery :photos="frontmatter.photos" />

<!-- You can also use the style of the photo separately -->
<!-- <VAPhoto :photo="frontmatter.photos[0]" /> -->