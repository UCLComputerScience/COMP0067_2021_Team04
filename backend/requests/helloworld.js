const { builtinModules } = require("module");

const helloWorld = (req, res) => {
    const name = req.query.name;
    res.send(`Hello ${name}`)
  };

module.exports = helloWorld;