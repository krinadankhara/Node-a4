"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionController = (app) => {
    const setSession = (req, res) => {
        var name = req.params['name'];
        var value = req.params['value'];
        // @ts-ignore
        req.session[name] = value;
        res.send(req.session);
    };
    const getSession = (req, res) => {
        var name = req.params['name'];
        // @ts-ignore
        var value = req.session[name];
        res.send(value);
    };
    const getSessionAll = (req, res) => {
        // @ts-ignore
        res.send(req.session);
    };
    const resetSession = (req, res) => {
        // @ts-ignore
        req.session.destroy();
        res.send(200);
    };
    app.get('/api/session/set/:name/:value', setSession);
    app.get('/api/session/get/:name', getSession);
    app.get('/api/session/get', getSessionAll);
    app.get('/api/session/reset', resetSession);
};
exports.default = SessionController;
