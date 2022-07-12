import rimraf from 'rimraf';
import webpackPaths from './webpack.paths';

function clean() {
  rimraf.sync(webpackPaths.distPath);
  rimraf.sync(webpackPaths.buildPath);
}

clean();
