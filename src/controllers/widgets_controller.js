class WidgetsController{
    getAll = (req, res ,next) => {
        res.render('admin/pages/widgets');
    }
}
module.exports = new WidgetsController();