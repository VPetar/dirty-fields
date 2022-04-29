// got an object here
const dirtyFields = require("./src/index");

const df = dirtyFields({
  first_name: "VPetar",
  last_name: "Who cares",
  dob: 1988,
  other_things: ["some", "other", "stuff"],
});

df.first_name = "qwe";

df.other_things.push("moooooreeeeee");

df.other_things = df.other_things.filter((qwe) => qwe !== "some");
df.other_things.splice(-1);

console.log(df);

console.log("only dirty fields: ");
console.log(df.__dirty_fields);
