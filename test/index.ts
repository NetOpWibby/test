


//  N A T I V E

import assert from "assert";

//  U T I L

import Test from "../dist";



//  T E S T S

const test = Test("@webb/test");
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



//  H E L P E R

function incr() {
  count++;
}
