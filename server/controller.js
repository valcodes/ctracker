module.exports = {
  create: (req, res, next) => {
    const db = req.app.get("db");
    const { userid, coinid } = req.body;

    db
      .addCoin([userid, coinid])
      .then(portfolio => res.status(200).send(portfolio))
      .catch(err => res.status(500).send(err));
  },
  getFavs: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getFavorites([req.user.id])
      .then(portfolio => res.status(200).send(portfolio))
      .catch(() => res.status(500).send());
  }
};
