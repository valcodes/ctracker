module.exports = {
  create: (req, res, next) => {
    const db = req.app.get("db");
    const { authid, coinid } = req.body;

    db
      .addCoin([authid, coinid])
      .then(portfolio => res.status(200).send(portfolio))
      .catch(err => res.status(500).send(err));
  },
  getFavs: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getFavorites([req.user.authid])
      .then(portfolio => res.status(200).send(portfolio))
      .catch(() => res.status(500).send());
  },
  deleteFromPortfolio: (req, res, next) => {
    const db = req.app.get("db");
    const { coinid, userid } = req.query;

    db
      .deleteCoin([coinid, userid])
      .then(portfolio => res.status(200).send(portfolio))
      .catch(() => res.status(500).send());
  }
};
