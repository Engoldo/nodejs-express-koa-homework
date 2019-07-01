let app = express();

error = (req, res, next) => {
  let err = new Error("not found");
  err.status = "404";
  next(err);
};

errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", { error: err });
};

module.exports = {
    error,
    errorHandler
};
