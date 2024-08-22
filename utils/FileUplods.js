const multer = require("multer");
const AppErr = require("./Apperr");
module.exports.UplodeSinglFile = (pathname, foldername) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${foldername}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppErr("image only", 500), false);
    }
  }

  const upload = multer({ storage: storage, fileFilter });
  return upload.single(pathname);
};

module.exports.UplodefieldsFiles = (pathsname, foldername) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${foldername}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppErr("image only", 500), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload.fields(pathsname);
};
