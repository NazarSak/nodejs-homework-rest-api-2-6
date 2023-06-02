const Joi = require("joi");

const Contact = require("../models/contact");

const { HttpErrors } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const getAllReq = async (req, res, next) => {
  try {
    const all = await Contact.find();
    res.json(all);
  } catch (error) {
    next(error);
  }
};

const getByIdReq = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const byId = await Contact.findById(contactId);

    if (!byId) {
      throw HttpErrors(404, "Not found");
    }
    res.json(byId);
  } catch (error) {
    next(error);
  }
};

const postReq = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }
    const add = await Contact.create(req.body);
    res.status(201).json(add);
  } catch (error) {
    next(error);
  }
};

const deleteReq = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const remove = await Contact.findByIdAndRemove(contactId);

      if (!remove) {
        throw HttpErrors(400, "Not found");
      }

      res.json({
        message: "Delete success",
      });
    } catch (error) {
      next(error);
    }
  }

const putReq = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpErrors(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const patchReq = async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      throw HttpErrors(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpErrors(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReq,
  getByIdReq,
  postReq,
  deleteReq,
  putReq,
  patchReq,
};
