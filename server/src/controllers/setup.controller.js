import fs from 'node:fs/promises';
import path from 'node:path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'node:url';

// resolve path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initialSetup = async () => {
  // setup initial contract directory
  const initialFolderUrl = path.resolve(
    __dirname,
    '../../../Smart_Contract_Library/Nft/src/Nft/Nft.hs',
  );

  try {
    // read the data from the contract
    const data = await fs.readFile(initialFolderUrl, 'utf8');
    const template = Handlebars.compile(data);
    const code = template({ tokenname: '', scriptName: '' });

    return code;
  } catch (e) {
    throw new Error(e);
  }
};

export default initialSetup;
