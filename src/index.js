#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import https from 'https';
import { URL } from 'url';

export default downloadPage = (url, directory = process.cwd()) => {
    const parsedUrl = new URL(url);
    const filename = `${parsedUrl.hostname}${parsedUrl.pathname}`.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '.html';
    const filepath = path.join(directory, filename);
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
      });
    }).on('error', (error) => {
      fs.unlink(filepath, () => {});
      throw error;
    });
    return filepath;
  };