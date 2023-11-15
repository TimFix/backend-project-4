#!/usr/bin/env node
import commander from 'commander';
import downloadPage from '../src/index.js';

export default () => {
  commander
    .description('Page loader utility')
    .arguments('<url>')
    .option('-o, --ou tput [path]', 'Output folder', process.cwd())
    .action((url, argv) => {
      const { output } = argv;
      downloadPage(url, output)
        .then(() => console.log(`Page loaded to ${output}`))
        .catch((error) => {
          console.error(error.message);
          process.exit(1);
        });
    })
    .parse(process.argv);
};