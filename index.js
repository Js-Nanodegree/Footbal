/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import StorybookUIRoot from './storybook';

const SHOW_STORYBOOK = process.env.USE_STORYBOOK === 'true';

AppRegistry.registerComponent(appName, () =>
  SHOW_STORYBOOK ? StorybookUIRoot : App,
);
AppRegistry.registerComponent(appName, () => App);
