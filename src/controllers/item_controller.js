class ItemController {
    getAll = (req, res, next) => {
        res.render('admin/pages/items');
    }
    add = (req, res, next) => {
        res.render('admin/pages/items/form');
    }
}

module.exports = new ItemController();