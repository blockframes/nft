
import { config } from 'dotenv';
import { exec } from 'child_process';

const env = config({ path: 'env/.env' });
const template = config({ path: 'env/.env.template' });

if (env.error) throw env.error;
if (template.error) throw template.error;

// (1) Verify that .env has every keys of the template
const envKeys = Object.keys(env.parsed);
const templateKeys = Object.keys(template.parsed);

const invalid = templateKeys.filter(key => !envKeys.includes(key));
if (invalid.length) throw new Error(`Some key(s) exits in template but not in .env, please add this keys to your .env:
${invalid.join(', ')}`);


// (2) Craft the command line to set function config
const commandBase = `firebase functions:config:set`;

const envEntries = Object.entries(env.parsed);
/** Array of functions config that will be set, in the form `key1=value1 key2=value2` */
const args = envEntries.map(([key, value]) => `${key}=${value}`).join(' ');
const command = `${commandBase} ${args}`;

// (3) Execute command
exec(command, (error, stdout, stderr) =>{
  if (error) {
    console.warn(error);
    console.error(stderr);
  } else {
    console.log(stdout);
  }
});

