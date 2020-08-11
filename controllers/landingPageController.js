

module.exports ={
    renderLanding: (req, res)=>{
        res.render("landing");
    },

    renderForbidden: (req, res)=>{

        res.render("forbidden");
    }
};