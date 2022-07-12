import path from 'path';

const rootPath = path.join(__dirname, '../');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath, 'main');
const srcRendererPath = path.join(srcPath, 'renderer');

const srcNodeModulesPath = path.join(srcPath, 'node_modules');

const distPath = path.join(rootPath, 'dist');
const distMainPath = path.join(distPath, 'main');
const distRendererPath = path.join(distPath, 'renderer');

const buildPath = path.join(rootPath, 'build');
const buildMainPath = path.join(buildPath, 'main');
const buildRendererPath = path.join(buildPath, 'renderer');

export default {
  rootPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distRendererPath,
  buildPath,
  buildMainPath,
  buildRendererPath,
};
