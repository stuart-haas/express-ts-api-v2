import type { Arguments, CommandBuilder } from 'yargs';
import { seeder } from 'cli/templates';
import { seedersPath } from 'config/app';
import { writeFileFromTemplate } from 'cli/helpers';

type Options = {
  name: string;
}

export const command = 'seeder:create';
export const desc = 'Create seeder file';

export const builder: CommandBuilder<Options, Options> = (yargs) => yargs.option('name', { type: 'string', demandOption: true, requiresArg: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { name } = argv;
  try {
    const filePath = await writeFileFromTemplate(name, seeder, seedersPath);
    process.stdout.write(`Seeder created at ${filePath}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};
