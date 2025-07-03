import { getStorybookUI, configure } from '@storybook/react-native';
import './stories';

configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  addons: [
    require('@storybook/addon-ondevice-actions/register'),
    require('@storybook/addon-ondevice-controls/register'),
    require('@storybook/addon-ondevice-notes/register'),
  ],
});

export default StorybookUIRoot;
