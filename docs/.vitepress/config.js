const { description } = require("../../package");

module.exports = {
  // base: "/vue-popper/",
  title: "Vue Popper",
  description: description,
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/what-is-vue-popper",
      },
      {
        text: "Github",
        link: "https://github.com/valgeirb/vue-popper",
      },
    ],
    sidebar: {
      "/guide/": getSidebar(),
      "/": getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "What is Vue Popper?", link: "/guide/what-is-vue-popper" },
        { text: "Getting Started", link: "/guide/getting-started" },
      ],
    },
    {
      text: "Advanced",
      children: [
        { text: "API", link: "/guide/api" },
        {
          text: "Theming",
          link: "/guide/theming",
        },
      ],
    },
  ];
}
