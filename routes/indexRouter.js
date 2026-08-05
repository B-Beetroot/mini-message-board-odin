const express = require("express");
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await db.getMessages();

  res.render("index", {
    title: "Mini Message Board",
    messages,
  });
});

router.get("/new", (req, res) => {
  res.render("form", {
    errors: [],
    values: {},
  });
});

router.post(
  "/new",
  [
    body("messageUser")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ max: 50 })
      .withMessage("Name must be under 50 characters."),

    body("messageText")
      .trim()
      .notEmpty()
      .withMessage("Message is required.")
      .isLength({ max: 500 })
      .withMessage("Message must be under 500 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("form", {
        errors: errors.array(),
        values: req.body,
      });
    }

    await db.createMessage(
      req.body.messageUser,
      req.body.messageText
    );

    res.redirect("/");
  }
);

router.get("/message/:id", async (req, res) => {
  const message = await db.getMessage(req.params.id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message });
});

module.exports = router;