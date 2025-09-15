import { defineSiteConfig } from "valaxy";

export default defineSiteConfig({
  url: "https://blog.20050815.xyz",
  favicon: "https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp",
  lang: "zh-CN",
  languages: ['zh-CN'], // 只启用中文
  title: "喵洛阁",
  author: {
    name: "克喵爱吃卤面",
    avatar: "https://img.314926.xyz/images/2025/09/15/kemiaoaclumian.webp",
    email: "me@mail.kemeow.top",
    link: "https://home.kemeow.top/",
  },
  description: "克喵的书斋",
  subtitle: "愿你看清一切真相后，依旧热爱你的家人和朋友。",

  feed: {
    favicon: "https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp",
  },

  cdn: {
    prefix: "https://npm.elemecdn.com/",
  },

  social: [
    {
      name: "RSS",
      link: "/atom.xml",
      icon: "i-ri-rss-line",
      color: "orange",
    },
    {
      name: "QQ",
      link: "http://wpa.qq.com/msgrd?v=3&uin=3149261770&site=qq&menu=yes",
      icon: "i-ri-qq-line",
      color: "#12B7F5",
    },
    {
      name: "GitHub",
      link: "https://github.com/kemiaofxjun",
      icon: "i-ri-github-line",
      color: "#6e5494",
    },
    {
      name: "网易云音乐",
      link: "https://music.163.com/#/user/home?id=1725716511",
      icon: "i-ri-netease-cloud-music-line",
      color: "#C20C0C",
    },
    // {
    //   name: "知乎",
    //   link: "https://www.zhihu.com/people/bigcake-19",
    //   icon: "i-ri-zhihu-line",
    //   color: "#0084FF",
    // },
    {
      name: "哔哩哔哩",
      link: "https://space.bilibili.com/3546643173477234",
      icon: "i-ri-bilibili-line",
      color: "#FF8EB3",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/kemiaojun",
      icon: "i-ri-twitter-line",
      color: "#1da1f2",
    },
    {
      name: "Telegram Channel",
      link: "https://t.me/KemiaoJun",
      icon: "i-ri-telegram-line",
      color: "#0088CC",
    },
    // {
    //   name: "百度贴吧",
    //   link: "https://tieba.baidu.com/home/main?id=tb.1.f0f48c80.0RMWKRqi00nEW65GQhsxQA?t=1586957539&fr=index",
    //   icon: "i-ri-baidu-line",
    //   color: "#317EF3",
    // },
    {
      name: "E-Mail",
      link: "mailto:me@mail.kemeow.top",
      icon: "i-ri-mail-line",
      color: "#8E71C1",
    },
  ],

  search: {
    enable: true,
    type: "fuse",
  },

  sponsor: {
    enable: true,
    description: "给我打钱，助力晓雨成为虚拟主播（划掉",
    methods: [
      {
        name: "支付宝",
        url: "https://img.314926.xyz/images/2025/07/12/alipay.webp",
        color: "#00A3EE",
        icon: "i-ri-alipay-line",
      },
      {
        name: "QQ 支付",
        url: "https://img.314926.xyz/images/2025/09/15/QQ-pay.webp",
        color: "#12B7F5",
        icon: "i-ri-qq-line",
      },
      {
        name: "微信支付",
        url: "https://img.314926.xyz/images/2025/07/12/wechat.webp",
        color: "#2DC100",
        icon: "i-ri-wechat-pay-line",
      },
      {
        name: "爱发电",
        url: "https://afdian.com/a/kemiaofx_me",
        color: "#936be5",
        icon: "i-ri-flashlight-line",
      },
    ],
  },

  comment: {
    enable: true,
  },

  mediumZoom: {
    enable: true,
  },

  statistics: {
    enable: true,
  },

  vanillaLazyload: {
    enable: false,
  },
});
