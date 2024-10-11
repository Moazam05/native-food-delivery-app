/**
 * @format
 */

import 'react-native-gesture-handler'; // This should be at the very top of your entry file
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
