const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service')




async function createPostController(req, res){
    const file = req.file;
    console.log("file received", file);

    const base64ImageFile = new Buffer.from(file.Buffer).toString('base64')

    const caption = await generateCaption(base64ImageFile);
    console.log('caption', caption);
}

module.exports = createPostController;