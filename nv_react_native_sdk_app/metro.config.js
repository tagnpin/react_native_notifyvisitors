// const path = require('path');

// module.exports = {
//   projectRoot: __dirname,
//   watchFolders: [path.resolve(__dirname, '../../react_native_notifyvisitors')],
// };

const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.watchFolders = [
  path.resolve(__dirname, '../../react_native_notifyvisitors'),
];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'),
];

module.exports = config;

// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const path = require('path');
// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const projectRoot = __dirname;
// const workspaceRoot = path.resolve(projectRoot, '..'); // plugin root

// const defaultConfig = getDefaultConfig(projectRoot);

// module.exports = mergeConfig(defaultConfig, {
//   watchFolders: [
//     workspaceRoot, // 👈 allow metro to see the plugin
//   ],

//   resolver: {
//     // 👇 Force single copies (VERY IMPORTANT)
//     extraNodeModules: {
//       react: path.join(projectRoot, 'node_modules/react'),
//       'react-native': path.join(projectRoot, 'node_modules/react-native'),
//       '@react-native/virtualized-lists': path.join(
//         projectRoot,
//         'node_modules/@react-native/virtualized-lists',
//       ),
//     },
//   },
// });

// const path = require('path');
// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const projectRoot = __dirname;
// const pluginRoot = path.resolve(__dirname, '..'); // plugin root

// const config = {
//   watchFolders: [pluginRoot],

//   resolver: {
//     nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],

//     disableHierarchicalLookup: true,
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
