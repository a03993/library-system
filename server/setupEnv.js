const fs = require("fs");
const path = require("path");

const envVariables = {
  MONGO_URI: process.env.MONGO_URI,
  PASSPORT_SECRET: process.env.PASSPORT_SECRET,
};

for (const [key, value] of Object.entries(envVariables)) {
  if (!value) {
    console.error(`Error: ${key} is not set.`);
    process.exit(1);
  }
}

const envContent = Object.entries(envVariables)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

fs.writeFileSync(path.join(__dirname, ".env"), envContent, "utf8");

console.log(".env file has been generated successfully.");
