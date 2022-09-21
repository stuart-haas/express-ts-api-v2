import type { Arguments, CommandBuilder } from 'yargs';
import { migration } from 'cli/templates';
import { migrationsPath } from 'config/app';
import { writeFileFromTemplate } from 'cli/helpers';

type Options = {
  name: string;
}

export const command = 'migration:create';
export const desc = 'Create migration file';

export const builder: CommandBuilder<Options, Options> = (yargs) => yargs.option('name', { type: 'string', demandOption: true, requiresArg: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { name } = argv;
  try {
    const filePath = await writeFileFromTemplate(name, migration, migrationsPath);
    process.stdout.write(`Migration created at ${filePath}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};
