import fs from 'fs/promises';
import path from 'path';

export async function generatePostsIndex() {
  if (process.env.NODE_ENV === 'development') {
    const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
    const allFileNames = await fs.readdir(postsPath);
    await fs.writeFile(path.resolve(postsPath, 'index.ts'), `export default ${JSON.stringify(allFileNames.filter((fileName) => fileName !== 'index.ts'))};`);
  }
}
