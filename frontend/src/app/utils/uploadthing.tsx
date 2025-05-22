import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
    url: `${import.meta.env.VITE_BASE_URL}/uploadthing`,
});
