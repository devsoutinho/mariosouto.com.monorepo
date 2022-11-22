import { withRoute } from "@src/infra/withRoute/withRoute";
import { userLoginEmailOnlyStartController } from "@src/modules/login/controller";


export default withRoute({
  GET: userLoginEmailOnlyStartController,
  POST: userLoginEmailOnlyStartController,
});
