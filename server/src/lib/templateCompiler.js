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

  let onchainContract = contract.toLowerCase();
  let firstLetter = onchainContract.charAt(0);
  firstLetter = firstLetter.toUpperCase();
  let remaningLetters = onchainContract.slice(1);
  onchainContract = firstLetter + remaningLetters;
  try {
    if (type === 'onchain') {
      filePath = path.resolve(
        __dirname,
        `../../../Smart_Contract_Library/${onchainContract}/src/${onchainContract}/${onchainContract}.hs`,
      );
    } else if (type === 'offchain') {
      const offchainContract = contract.toLowerCase();
      filePath = path.resolve(
        __dirname,
        `../../../Smart_Contract_Library/${onchainContract}/src/${onchainContract}/lucid-${offchainContract}.ts`,
      );
    } else {
      throw new Error('no contract found');
    }

    fileData = await fs.readFile(filePath, 'utf8');
  } catch (e) {
    console.log(e)
    throw new Error(e);
  }

  const template = Handlebars.compile(fileData);

  const updatedTemplate = template(context);

  return updatedTemplate;
};

export default compileTemplate;
