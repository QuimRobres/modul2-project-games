module.exports = {
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/public/edit-profile');
        }
    },
    isLoggedOut: (req, res, next) => {
        if(req.isAuthenticated()) {
            res.redirect('/');
        } else {
            next();
        }
    }
}