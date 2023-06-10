const express = require("express")
const { validateBody } = require("../../decorators")

const router = express.Router()

const {schemas} = require("../../models/user")

const ctrlAuth = require("../../controllers/auth")

router.post("/register" , validateBody(schemas.registerShema), ctrlAuth.register);

router.post("/login", validateBody(schemas.loginShema), ctrlAuth.login)

module.exports = router