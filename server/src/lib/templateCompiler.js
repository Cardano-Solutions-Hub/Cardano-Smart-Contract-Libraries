import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import Handlebars from 'handlebars';

// resolve path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compileTemplate = async (contract, type, context) => {
  let filePath;
  let fileData;

  try {
    if (type === 'onchain') {
      const onchainContract = contract.toUpperCase();
      filePath = path.resolve(
        __dirname,
        `../../../Smart_Contract_Library/${contract}/src/${contract}/${onchainContract}.hs`,
      );
    } else if (type === 'offchain') {
      const offchainContract = contract.toLowerCase();
      filePath = path.resolve(
        __dirname,
        `../../../Smart_Contract_Library/${contract}/src/${contract}/lucid-${offchainContract}.ts`,
      );
    } else {
      throw new Error('no contract found');
    }

    fileData = await fs.readFile(filePath, 'utf8');
  } catch (e) {
    throw new Error(e);
  }

  const template = Handlebars.compile(fileData);

  const updatedTemplate = template(context);

  return updatedTemplate;
};

export default compileTemplate;
