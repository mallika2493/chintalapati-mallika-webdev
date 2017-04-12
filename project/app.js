/**
 * Created by mallika2493 on 2/24/17.
 *
 */


module.exports = function(app) {
    var model = require("./model/models.server.js")();

    require("./services/user.service.server.js")(app,model);
    require("./services/series.service.server.js")(app,model);
    require("./services/reviews.service.server.js")(app,model);
    require("./services/actor.service.server.js")(app,model);
    require("./services/status.service.server.js")(app,model);


};