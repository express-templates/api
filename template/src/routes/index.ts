import { router } from "express-fw";

export default router({
  get(req, res) {
    res.json({
      message: "Hello expressjs",
    });
  },
});
 