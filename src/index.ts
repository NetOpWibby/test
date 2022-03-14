


///  I M P O R T

import print from "@webb/console";



///  E X P O R T

export default test;

export function test(headline: string) {
  const after: any[] = [];
  const before: any[] = [];
  const only: any[] = [];
  const output: any[] = [];
  const suite: any[] = [];

  function self(name: string, fn: any) {
    suite.push({ name, fn });
  }

  self.after = (fn: any, _?: any) => after.push(fn);
  self.before = (fn: any, _?: any) => before.push(fn);
  self.only = (name: string, fn: any) => only.push({ name, fn });
  self.skip = (fn?: any, _?: any) => {}

  // For testing @webb/test
  self.run = async() => {
    const tests = only[0] ?
      only :
      suite;

    output.push(print.invert(` ${headline} `));

    for (const test of tests) {
      try {
        for (const fn of before)
          await fn();

        await test.fn();
        output.push(" ●");
      } catch(e) {
        for (const fn of after)
          await fn();

        output.push(print.invert(`\n\n! ${test.name} \n\n`));
        process.stdout.write(output.join("") + "\n");
        prettyError(e);

        return false;
      }
    }

    for (const fn of after)
      await fn();

    output.push(" " + print.invert(` ✓ ${ tests.length } `) + "\n");
    process.stdout.write(output.join("") + "\n");
  }

  return self;
};



///  H E L P E R

function prettyError(e: any) {
  const msg = e.stack;

  if (!msg)
    return process.stdout.write(print.bold(e) + "\n");

  const i = msg.indexOf("\n");

  process.stdout.write(print.bold(msg.slice(0, i)) + "\n");
  process.stdout.write(print.dim(msg.slice(i)) + "\n");
}
