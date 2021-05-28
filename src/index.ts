


//  I M P O R T

import print from "@webb/console";



//  E X P O R T

export default (headline: string) => {
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
        output.push(print.white(" ●"));
      } catch(e) {
        for (const fn of after)
          await fn();

        output.push(print.red(`\n\n! ${test.name} \n\n`));
        console.log(output.join(""));
        prettyError(e);

        return false;
      }
    }

    for (const fn of after)
      await fn();

    output.push(" " + print.greenLine(print.black(` ✓ ${ tests.length } `)) + "\n");
    console.log(output.join(""));
  }

  return self;
};



//  H E L P E R

function prettyError(e: any) {
  const msg = e.stack;

  if (!msg)
    return console.log(print.yellow(e));

  const i = msg.indexOf("\n");

  console.log(print.yellowLine(print.black(msg.slice(0, i))));
  console.log(print.gray(msg.slice(i)));
}
