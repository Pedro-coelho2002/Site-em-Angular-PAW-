var express = require("express");
var router = express.Router();

const stripe = require("stripe")(
    "sk_test_51MtHwMEICoImyemIFuo2qJp4o9UNAhRATm4m3LcG6MiSy7RxQH3HY3oY96yTi5V79eRWK0enfgo2U731a673CWYf007HmJILGu"
  );
  router.post("/", async (req, res, next) => {
    try {
      const lineItems = req.body.items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.eventName,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["PT", "FR", "ES"],
        },
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:4200/checkout/success",
        cancel_url: "http://localhost:4200/checkout/cancel",
      });
  
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  });

  router.get("/success", async (req, res)=> {
    res.render("../views/stripe/success");
  });

  router.get("/cancel", async (req, res)=> {
    res.render("../views/stripe/cancel");
  });


module.exports = router;