import router from "./router.js";

import login from "./components/login.js";
import map from "./components/map.js";
import mapping from "./components/mapping.js";
import bind from "./bind.js";
import position from "./components/position.js";
import showOrder from "./components/showOrder.js";
import editOrder from "./components/editOrder.js";
import navigation from "./navigation.js";
import homeBurren from "./components/homeBurren.js";

router.register('/login', login);
router.register('/map', map);
router.register('/mapping', mapping);
router.register('/bind', bind);
router.register('/position', position);
router.register('/showOrder', showOrder);
router.register('/editOrder', editOrder);
router.register('/navigation', navigation);
router.register('/homeBurren', homeBurren);

router.navigate('/homeBurren');