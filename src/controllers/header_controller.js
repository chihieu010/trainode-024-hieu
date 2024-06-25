class HeadersController{
    getHome = (req, res ,next) => {
        res.render('admin/pages/header/home');
    }
    getContact = (req, res ,next) => {
        res.render('admin/pages/header/contact');
    }

}
module.exports = new HeadersController();