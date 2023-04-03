const mongoUtil = require("./mongoUtil.js");
let db;

mongoUtil.openConn(function (err) {
  db = mongoUtil.getDb();
  if (err) console.log(err);
});

const search = async (req, res) => {
  const query = req.body.name;
  const results = await mongoUtil.findDocuments(db, query);
  res.send({ results: results });
};

module.exports = {
  search,
};
