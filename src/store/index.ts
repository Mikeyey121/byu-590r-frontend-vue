import { createStore } from "vuex";
import { auth } from "./auth.module";
import { user } from "./user.module";
import { project } from "./project.module";
const store = createStore({
   modules: {
       auth,
       user,
       project,
   },
});

export default store;