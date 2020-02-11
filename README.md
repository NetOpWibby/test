# @webb/test

> Tiny, simple test runner



## Install

```sh
$ npm i @webb/test -D
```



## Usage

```js
import Test from "@webb/test";

const test = Test("Name of your test");
let count = 0;

test.before(incr);
test("A", incr);
test.skip("B", incr);

test("rejects", async() => {
  await assert.rejects(async() => {
    throw new TypeError("Oops");
  }, {
    name: "TypeError",
    message: "Oops"
  });
});

!(async() => {
  try {
    await test.run();
    assert.equal(count, 3);
  } finally {
    process.exit();
  }
})();

function incr() {
  count++;
}
```



## API

### test(testName, fun);
#### testName
Type: `string`
#### fun
Type: `function`

Runs a function that contains the expectations to test. The first argument is the test name, which is shown when the test function fails.

### test.only(testName, fun);
#### testName
Type: `string`
#### fun
Type: `function`

Run only these tests and ignore the rest.

```js
// Test the actively developed function
test.only("add team", async() => {
  const team = await app.addTeam("Acme Inc.");
});
```

### test.before(fun);
#### fun
Type: `function`

Run the given function before all the supplied tests.

```js
// Remove all data prior each run
test.before(async() => {
  await app.cluster.clearAll();
});
```

### test.after(fun);
#### fun
Type: `function`

Run the given function when there is a failure or after all the tests have passed.

### test.skip(testName?, fun?);
#### testName
Type: `string`
#### fun
Type: `function`

Skip the given function. Useful for omitting tests temporarily.

```js
// Ignore slow, broken, or incomplete stuff
test.skip("invite a friend", async() => {
  // TODO
});
```

### test.run()

Run all the supplied tests.
