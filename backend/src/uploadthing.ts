import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: "512KB",
            maxFileCount: 1,
        },
    }).onUploadComplete((data) => {
        console.log("upload completed", data);
        // TODO: Save the image to the database
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
