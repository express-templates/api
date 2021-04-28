import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { ISetupCache } from "axios-cache-adapter/axios-cache-adapter";

const cache: ISetupCache = setupCache({
  maxAge: 15 * 60 * 1000,
});

export default axios.create({
  adapter: cache.adapter,
});
