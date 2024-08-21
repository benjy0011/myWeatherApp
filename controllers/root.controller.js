const getRoot = (req, res) => {
    // root.ejs
    res.render("root");
};

module.exports = { getRoot };