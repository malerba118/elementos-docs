module.exports = {
  title: 'Elementos',
  tagline: 'Composable Reactive State Management',
  url: 'https://malerba118.github.io',
  baseUrl: '/elementos-docs/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'malerba118', // Usually your GitHub org/user name.
  projectName: 'elementos-docs', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  stylesheets: ['https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=block'],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Elementos',
        src: 'img/logo.svg',
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'elementos',
              to: 'docs/',
            },
            {
              label: 'elementos-react',
              to: 'docs/react/overview',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'elementos',
              href: 'https://github.com/malerba118/elementos',
            },
            {
              label: 'elementos-react',
              href: 'https://github.com/malerba118/elementos-react',
            }
          ],
        },
        {
          title: 'NPM',
          items: [
            {
              label: 'elementos',
              href: 'https://www.npmjs.com/package/elementos',
            },
            {
              label: 'elementos-react',
              href: 'https://www.npmjs.com/package/elementos-react',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Austin Malerba. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
