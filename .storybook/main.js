module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    {
      // 👇 The directory field sets the directory your stories
      directory: '../src/stories/form',
      // 👇 The titlePrefix field will generate automatic titles for your stories
      titlePrefix: 'Form',
      files: '*.stories.tsx',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',

}
