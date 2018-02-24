SELECT array_agg(DISTINCT coinid)
FROM portfolio
JOIN users  ON portfolio.authid = users.authid
WHERE users.authid = $1;