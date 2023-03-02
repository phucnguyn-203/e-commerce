const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (file, folder) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
        folder,
    });
    return result.url;
};
