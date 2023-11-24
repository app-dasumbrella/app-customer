module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true },],
    ['react-native-reanimated/plugin'],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          "@app": ["src"],
          "@screens": ["screens"],
          "@containers": ["containers"],
          "@components": ["components"],
          "@common": ["common"],
          "@images": ["images"],
          "@services": ["services"],
          "@data": ["data"],
          "@store": ["store"],
          "@utils": ["utils"],
          "@redux": ["redux"],
        }
      }
    ],
    'jest-hoist'
  ]
};