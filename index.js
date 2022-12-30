const express = require("express");
const app = express();

const mail = require("./mail");

const sendPromoMail = async () => {
  try {
    await mail.sendMail("cureu.ncristian@gmail.com", "Welcome", "promo", {
      name: "Cristian",
    });
  } catch (err) {
    console.log(err);
  }
};

// sendPromoMail();

app.listen(5000, () => {
  console.log("Server up!");
});
