import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

const data = JSON.parse(fs.readFileSync('./tmp/profile_data.json', { encoding: 'utf8', flag: 'r' }));
data.forEach((row) => {
  const code = row['soc_id'];
  const p = path.join('./src/assets/profiles', code);
  shell.mkdir('-p', `./src/assets/profiles/${code}`);
  fs.writeFileSync(p + '/' + 'metadata.json', JSON.stringify(row, null, 2));
});
