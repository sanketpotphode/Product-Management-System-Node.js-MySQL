const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 3000;
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb)
        {
            cb(null, "upload");
        },
        filename:function(req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")

        }

    })
}).single("user_file");

app.post("/upload",upload, (req, resp)=>{
    resp.send("file uploaded");
})

 
app.listen(PORT,()=>{console.log(`server is running on port: ${PORT}`)});