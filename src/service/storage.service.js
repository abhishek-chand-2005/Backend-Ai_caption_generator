
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey :'public_67WK9rPS6cHxd8jja46MIQ+vksU=',
    privateKey : "private_7v/kannjdP0lC6cV19/CpoFiqzY=",
    urlEndpoint : "https://ik.imagekit.io/yiu5mtijv"
});

async function uploadFile(file, filename){

    const response = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: 'cohort-Ai-social'
    })
    return response
}

module.exports ={ uploadFile };