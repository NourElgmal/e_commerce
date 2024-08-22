const AppErr = require("../../utils/Apperr");
const { catcherror } = require("../../utils/catcherr");
const slugify = require("slugify");
const ApiFeatures = require("../../utils/ApiFeatures");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { review_model } = require("../reviews/review.module");
require("dotenv").config({ path: "../../config/.env" });
module.exports.delete_one = (model) => {
  return catcherror(async (req, res) => {
    const { id } = req.params;
    !id && next(new AppErr(" id is required", 400));
    let c = await model.findByIdAndDelete(id);
    if (!c) {
      return res.json({ msg: "not found" });
    }
    res.json({ msg: "delet secc" });
  });
};
module.exports.get_one = (model) => {
  return catcherror(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return next(new AppErr("id is required", 400));
    }
    let rev;
    if (model.modelName === "product_model") {
      rev = await review_model.find({ product_id: id });
    }
    let doc = await model.findById(id);
    res.json({ msg: doc, reviews: rev });
  });
};

module.exports.get_all = (model) => {
  return catcherror(async (req, res) => {
    const modelFilterFields = {
      product_model: "brand_id",
      subcategory_model: "category_id",
    };
    const filterField = modelFilterFields[model.modelName];
    let doc;
    if (req.params.id && filterField) {
      let filter = {};
      filter[filterField] = req.params.id;
      console.log(filter);
      let apifeatures = new ApiFeatures(model.find(filter), req.query)
        .search()
        .select()
        .sort_query()
        .pagination()
        .filter(filter);

      doc = await apifeatures.mongooseQuery;
    } else {
      let apifeatures = new ApiFeatures(model.find({}), req.query)
        .search()
        .select()
        .sort_query()
        .pagination()
        .filter({});

      doc = await apifeatures.mongooseQuery;
    }

    res.json({ msg: doc });
  });
};
module.exports.update = (model) => {
  return catcherror(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.file) {
      req.body.img = req.file.filename;
    }
    if (!id) {
      return next(new AppErr(" id   is required", 400));
    }
    let doc;
    if (model.modelName === "review_model") {
      doc = await model.findOneAndUpdate(
        { _id: id, user_id: req.userid },
        req.body,
        { new: true }
      );
    } else {
      doc = await model.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (doc) {
      res.status(200).json({ msg: doc });
    } else {
      return next(new AppErr("not found check your id", 400));
    }
  });
};
module.exports.add_new = (model, requiredFields) => {
  return catcherror(async (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(new AppErr(`${field} is required`, 400));
      }
    }
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.file) {
      req.body.img = req.file.filename;
    }
    if (req.body.email) {
      const user = await model.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return next(new AppErr("email is exit im sory"));
      }
    }
    if (req.files) {
      if (req.files.img && req.files.img.length > 0) {
        req.body.img = req.files.img.map((file) => file.filename);
        req.body.imgcover = req.files.imgcover[0].filename;
      }
    }
    if (model.modelName === "user_model") {
      req.body.passchangAt = Date.now();
    }
    //console.log(model.modelName, "review_model");

    if (model.modelName === "review_model") {
      if (req.body.user_id === req.userid) {
        const u = await model.findOne({
          user_id: req.body.user_id,
          product_id: req.body.product_id,
        });
        if (u) {
          return next(new AppErr(" review is already exait", 409));
        }
      }
    }

    const item = new model(req.body);
    await item.save();
    const itemType = model.modelName.toLowerCase();

    res.json({ msg: "add ", [itemType]: item });
  });
};
module.exports.changepass = (model) => {
  return catcherror(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return next(new AppErr(" id   is required", 400));
    }
    req.body.passchangAt = Date.now();
    let doc = await model.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: doc });
  });
};
module.exports.sinin = (model) => {
  return catcherror(async (req, res, next) => {
    const { email, pass } = req.body;
    const user = await model.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(pass, user.pass);
      if (match) {
        var token = jwt.sign(
          { email: user.email, name: user.name, id: user._id },
          process.env.KEY
        );
        res.status(200).json({ msg: "sin in tmam", tok: token });
      } else {
        return next(new AppErr("err in pass", 500));
      }
    } else {
      return next(new AppErr("email is not fond", 500));
    }
  });
};
