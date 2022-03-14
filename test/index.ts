


///  N A T I V E

import assert from "assert";

///  U T I L

import defaultExport, { test } from "../dist";



///  T E S T

const testDefaultExport = defaultExport("@webb/test");
const testNamedExport = test("@webb/test, named export");

let testDefaultExportCount = 0;
let testNamedExportCount = 0;

testDefaultExport.before(incrementDefaultExport);
testNamedExport.before(incrementNamedExport);

testDefaultExport("A", incrementDefaultExport);
testNamedExport("A", incrementNamedExport);

testDefaultExport.skip("B", incrementDefaultExport);
testNamedExport.skip("B", incrementNamedExport);

testDefaultExport("rejects", async() => {
  await assert.rejects(async() => {
    throw new TypeError("Oops");
  }, {
    name: "TypeError",
    message: "Oops"
  });
});

testNamedExport("rejects", async() => {
  await assert.rejects(async() => {
    throw new TypeError("Oops");
  }, {
    name: "TypeError",
    message: "Oops"
  });
});

!(async() => {
  try {
    await testDefaultExport.run();
    await testNamedExport.run();
    assert.equal(testDefaultExportCount, 3);
    assert.equal(testNamedExportCount, 3);
  } finally {
    process.exit();
  }
})();



///  H E L P E R

function incrementDefaultExport() {
  testDefaultExportCount++;
}

function incrementNamedExport() {
  testNamedExportCount++;
}
