import authMiddleware from "../middleware/authMiddleware";
import userController from "../controllers/userController";

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/test/all", userController.allAccess);

  app.get("/test/user", [authMiddleware.verifyToken], userController.userBoard);

  app.get(
    "/test/admin",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    userController.adminBoard
  );
};

export default userRoute;
