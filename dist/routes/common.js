"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonRouter = void 0;
class CommonRoutes {
    route(app) {
        app.all('*', function (req, res) {
            res.status(404).send({ error: true, message: `Oops, it looks like you're lost` });
        });
    }
}
exports.commonRouter = new CommonRoutes();
