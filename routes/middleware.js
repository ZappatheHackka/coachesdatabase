export const isAuthenticated = (req, res, next) => {
    if (req.session.userid) {
        return next();
    }
    req.flash('error', 'You must be logged in to view this page!');
    res.redirect('/');
}

export const isAdmin = (req, res, next) => {
    if (req.session.adminStatus) {
        return next();
    }
    req.flash('error', 'You must have Admin permissions to view this page');
    res.redirect('/home');
}