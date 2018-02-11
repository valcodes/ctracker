SELECT array_agg(coinid)
FROM portfolio
JOIN users  ON portfolio.userid = users.id
WHERE users.id = $1;