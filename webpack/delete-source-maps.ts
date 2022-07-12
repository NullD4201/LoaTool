import path from 'path';
import rimraf from 'rimraf';
import webpackPaths from './webpack.paths';

export default function deleteSourceMaps() {
  rimraf.sync(path.join(webpackPaths.buildMainPath, '*.js.map'));
  rimraf.sync(path.join(webpackPaths.buildRendererPath, '*.js.map'));
}
