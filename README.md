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

test("Add user", async() => {
  const user = await app.addUser("test@cc.com");
  assert.equals(user.name, "Test");
})

test("Reject duplicate emails", async() => {
  await assert.rejects(async() => {
    await app.addUser("duplicate@address.com");
  });
});

test.run();
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



## Tests

```sh
# Run all tests, sequentially
$ npm test

# Test dependencies for latest versions
$ npm run test:dependencies

# Lint "src" directory
$ npm run test:typescript

# Test this module
$ npm run test:assert

# Not really a test, just shows a 20x9 rainbow-esque banner
$ npm run showcase
```



## Support

I don't drink coffee so if you like this module and want to support me, feel free to send some HNS to `hs1q98ddwl2lcpnnzfvvrqad80qu97w0q72cyq2uy3`!
