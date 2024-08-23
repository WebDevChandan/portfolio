import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

type ImageConfigType = {
    folderName: string;
    width: number;
    height: number;
};

export async function uploadImage(imageFile: File, imageConfig: ImageConfigType) {
    try {
        const imageFileName = imageFile?.name.match(/^([^\.]+)/)?.[0] ?? null;

        //If the image is already existing in the current folder, no need to upload/overwrite it (but i want to overwrite)
        // const existingImage = await cloudinary.api.resource(`${imageConfig.folderName}/${imageFileName}`);
        // if (existingImage) {
        //     return existingImage;
        // }

        const arrayBuffer = await imageFile.arrayBuffer();
        const bufferImage = new Uint8Array(arrayBuffer);

        return await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                // tags: ['GoChat-Dashboard'],              //Uses: Project Screenshots by - await cloudinary.api.resources_by_tag('GoChat-Dashboard',{})
                public_id: imageFileName as string,
                folder: imageConfig.folderName,
                transformation: [
                    {
                        quality: 'auto',
                        fetch_format: 'webp',
                    }, {
                        width: imageConfig.width,
                        height: imageConfig.height,
                        crop: 'fill',
                        gravity: 'auto',
                    }
                ]
            }, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(bufferImage);
        })

    } catch (error) {
        console.error("Error Uploading Image: ", error);
    }
}