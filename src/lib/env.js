const path = require("path")

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}

// if (!process.env.NODE_CONFIG_DIR) {
//   process.env.NODE_CONFIG_DIR = path.resolve(__dirname + "/../../config")
// }
