class UserController{
    getAll = (req, res ,next) => {
        res.render('admin/pages/user');
    }
}
module.exports = new UserController();

