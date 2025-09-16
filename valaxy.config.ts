import { defineValaxyConfig } from "valaxy";
import type { ThemeConfig } from "valaxy-theme-custom";
import { addonLightGallery } from "valaxy-addon-lightgallery";
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { addonComponents } from 'valaxy-addon-components'
import { addonWaline } from 'valaxy-addon-waline'
import { addonMeting } from 'valaxy-addon-meting'
import { addonBangumi } from 'valaxy-addon-bangumi'
import { addonVercount } from 'valaxy-addon-vercount'
import { addonFace } from 'valaxy-addon-face'
import { addonGitLog } from 'valaxy-addon-git-log'

/**
 * User Config
 */
export default defineValaxyConfig<ThemeConfig>({
  addons: [
    addonLightGallery(),
    addonComponents(),
    addonWaline({
      serverURL: 'https://waline.kemeow.top',
    }),
        addonMeting({
      global: true,
      /** @see https://github.com/metowolf/MetingJS */
      props: {
        id: '13681647281',
        server: 'netease',
        type: 'playlist',
      },
      options: {
        lyricHidden: true,   // ← 关闭歌词面板
        autoHidden: true,   // 保持默认
        animationIn: true,
      },
    }),
        addonBangumi({
      api: 'https://yi_xiao_jiu-bangumi.web.val.run',
      bilibiliUid: '3546643173477234',
      bgmEnabled: false,
        }),
        addonVercount({
      api: 'cn'
    }),
        addonFace({
      // 配置
      defaultSuffix: 'webp'
        }),
     addonGitLog({
      repositoryUrl: 'https://github.com/kemiaofxjun/Valaxy-SilverRiver.git',
    }),
  ],

  siteConfig: {
    // 启用评论
    comment: {
      enable: true
    },
  },

  vite: {
    optimizeDeps: {
      include: ["artalk", "axios"],
    },
    plugins: [
      ViteMinifyPlugin({
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      }),
    ],
  },

  theme: "custom",

  themeConfig: {
    author: {
      slogan: "每一段旅行都有终点~",
    },

    footer: {
      since: 2025,
      beian: {
        icp: {
          enable: false,
          info: "晋 ICP 备 2024031556 号 - 1",
        },
        moe: {
          enable: true,
          info: "20250530",
        },
      },
      hitokoto: {
        enable: true,
      }
    },

    pages: [
      {
        name: "归档",
        url: "/archives",
      },
      {
        name: "友链",
        url: "/links",
      },
    ],

    asidePages: [
      {
        name: "隐私政策",
        url: "/policies/privacy",
      },
      {
        name: "微语动态",
        url: "/talk",
      },
      {
        name: "微语即刻",
        url: "/moment",
      },
      {
        name: "番剧",
        url: "/bangumi",
      },
      {
        name: "朋友圈",
        url: "/fc",
      },
      {
        name: "相册集",
        url: "/albums",
      },
      {
        name: "关于我",
        url: "/about",
      },
      // {
      //   name: "状态监控",
      //   url: "https://status.kemeow.top",
      // },
    ],

    quickAccess: [
      {
        name: "RSS",
        url: "/atom.xml",
        icon: "i-ri-rss-line",
      },
    ],

    announcement: {
      enable: true,
      type: "info",
      content: "欢迎来到克喵的博客！这里记录了我生活日常、资源分享和踩坑教程，希望你能喜欢！",
    },

    valaxyDarkOptions: {
      useDarkOptions: {
        selector: "html",
        attribute: 'data-theme',
        valueDark: "dark",
        valueLight: "light",
        disableTransition: false,
      },

      circleTransition: false,
    },

    pageLoading: true,
  },

  features: {
    katex: false,
  },

  markdown: {
    theme: {
      light: "material-theme-lighter",
      dark: "material-theme-darker",
    },
  },

  build: {
    ssgForPagination: true,
  },

  modules: {
    rss: {
      enable: true,
      fullText: false,
    },
  }
});
