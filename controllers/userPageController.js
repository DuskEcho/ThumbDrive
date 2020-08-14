let moment = require("moment");

module.exports ={
    renderLanding: (req, res)=>{

        let index = Math.floor(Math.random()*3);
        let bgs = ["/img/can-tho-4162141_1920.jpg","/img/floating-market-3013639_1920.jpg","/img/seongnam-2333350_1920.jpg"];

        if (!req.googlePayload){
            req.googlePayload = {given_name: "Me"};
        }
        let user = req.googlePayload.given_name;
        let headerBackgroundImage = {src:"/img/bridgeSkinny.jpg"};

        res.render("user", {userName: user, headerBG: headerBackgroundImage, mainBG: bgs[index]});
    }
};