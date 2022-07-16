import router from "./router.js";

import login from "./components/login.js";
import map from "./components/map.js";
import mapping from "./components/mapping.js";
import bind from "./bind.js";

router.register('/login', login);
router.register('/map', map);
router.register('/mapping', mapping);
router.register('/bind', bind);

router.navigate('/mapping');