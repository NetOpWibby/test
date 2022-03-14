# @webb/test

> Tiny, simple test runner



## Install

```sh
npm i @webb/test -D
```



## Usage

```ts
import { test } from "@webb/test"; // use the named export...
import Test from "@webb/test";     // or, the default and name it whatever you want

const myTest = test("Name of your test");

myTest("Add user", async() => {
  const user = await app.addUser("test@cc.com");
  assert.equals(user.name, "Test");
})

myTest("Reject duplicate emails", async() => {
  await assert.rejects(async() => {
    await app.addUser("duplicate@address.com");
  });
});

myTest.run();
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

```ts
// Test the actively developed function
test.only("add team", async() => {
  const team = await app.addTeam("Acme Inc.");
});
```

### test.before(fun);
#### fun
Type: `function`

Run the given function before all the supplied tests.

```ts
// Remove all data prior to each run
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

```ts
// Ignore slow, broken, or incomplete functions
test.skip("invite a friend", async() => {
  // TODO
});
```

### test.run()

Run all the supplied tests.



## Tests

```sh
# Run all tests, sequentially
npm test

# Test dependencies for latest versions
npm run test:dependencies

# Lint "src" directory
npm run test:lint

# Test this module
npm run test:lint-assert
```
