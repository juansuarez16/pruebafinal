const multer = require('multer');
const Model = require("../models/modelCRUD");

const params = multer().none();
let home = {}


// home.index = (req, res, next) => {    
//     res.send("hola mundo");
// }

home.read = async (req, res, next) => {    
    await params(req, res, async (err) => {
        
        await Model.read(req.body, async (result) => {
            await res.status(200).json(result);
        })
    });
}

home.create = async (req, res, next) => { 
    await params(req, res, async (err) => {   
       
        await Model.create(req.body, async (result) => {
            await res.status(200).json(result);
        })
        
    });
}
home.update = async (req, res, next) => {    
    await params(req, res, async (err) => {
        
        await Model.update(req.body, async (result) => {
            await res.status(200).json(result);
        })
    });
}

home.delete = async (req, res, next) => {    
    await params(req, res, async (err) => {
        
        await Model.delete(req.body, async (result) => {
            await res.status(200).json(result);
        })
    });
}


module.exports = home;