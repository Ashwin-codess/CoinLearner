import express from "express";
import mysql from "mysql2";
const app = express();
import cors from "cors";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@01jst21is009",
  database: "crypto_project",
});
app.use(express.json());
app.use(cors());
const x = 0;
app.get("/fetchinfo=:userid", (req, res) => {
  const id = req.params.userid;
  const q = `SELECT * FROM users WHERE USERID = '${id}'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);jhgfe
  });
});
// app.post("/updatewallet=:userid", (req, res) => {
//   const id = req.params.userid;
//   const q = `UPDATE users
//   SET
//       WALLET = 'mary.patterson@classicmodelcars.com'
//   WHERE
//       USERID = ${id};`;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });
app.post("/", (req, res) => {
  const { USERID, NAME, WALLET } = req.body;
  const q = `INSERT INTO users (USERID, NAME, WALLET,SELLED) VALUES ('${USERID}', '${NAME}', '${WALLET}','0')`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.send(data);
  });
});

app.post("/userpage:userid", (req, res) => {
  const id = req.params.userid;
  const { USERID, INVESTMENTID, COINNAME, NOOFCOINS, AMOUNT, DATE } = req.body;
  const x = `UPDATE users SET WALLET = WALLET + ${parseInt(
    AMOUNT
  )} WHERE USERID = '${id}';`;
  const q = `INSERT INTO investments (USERID,INVESTMENTID,COINNAME,NOOFCOINS,AMOUNT,DATE) VALUES ('${id}','${INVESTMENTID}','${COINNAME}',${NOOFCOINS},${AMOUNT},'${DATE}');`;
  db.query(x, (err, data) => {
    if (err) return res.json(err);
    return db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.send(data);
    });
  });
});

app.get("/userpage:userid", (req, res) => {
  const id = req.params.userid;
  const q = `SELECT * FROM investments WHERE USERID = '${id}';`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// app.delete("/userpage:userid/investid:investid", (req, res) => {
//   const id = req.params.userid;
//   const invid = req.params.investid;
//   const q = `DELETE FROM investments WHERE USERID = '${id}' AND INVESTMENTID = '${invid}';`;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json("BOOK Deleted succesfully");
//   });
// });
app.delete("/userpage:userid/", (req, res) => {
  const id = req.params.userid;
  const q = `DELETE FROM investments WHERE USERID = '${id}';`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("BOOK Deleted succesfully");
  });
});

app.post("/userpage:userid/history", (req, res) => {
  const id = req.params.userid;

  const { INVESTID, COINNAME, NOOFCOIN, SELLAMT, PURAMT, SELLDATE, PURDATE } =
    req.body;

  const x = `UPDATE users SET SELLED = SELLED + ${parseInt(
    SELLAMT
  )}, WALLET = WALLET - ${parseInt(PURAMT)} WHERE USERID = '${id}';`;

  const y = `DELETE FROM investments WHERE INVESTMENTID = '${INVESTID}';`;
  const q = `INSERT INTO histry (UID, INVESTID, COINNAME, NOOFCOIN, SELLAMT, PURAMT, SELLDATE, PURDATE) VALUES ('${id}','${INVESTID}','${COINNAME}',${NOOFCOIN},${SELLAMT},${PURAMT},'${SELLDATE}','${PURDATE}');`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return db.query(x, (err, data) => {
      if (err) return res.json(err);
      return db.query(y, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });
  });
});
app.get("/userpage:userid/history", (req, res) => {
  const id = req.params.userid;
  const q = `SELECT * FROM histry WHERE UID = '${id}';`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// app.get("/userpage:userid", (req, res) => {
//   const id = req.params.userid;
//   const q = `SELECT * FROM investments WHERE USERID = '${id}';`;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

app.listen(8800, () => {
  console.log("connectedddd");
});
