/* eslint-disable */
const execSync = require('child_process').execSync;
const rimraf = require('rimraf');


try {
  rimraf.sync('./dist');
} catch(err) {
  console.error(err);
  process.exit(1);
}

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log('\nBuilding ES modules ...');

exec('babel src/ -d dist/es  --presets es2015,stage-2', {
    BABEL_ENV: 'es',
});
