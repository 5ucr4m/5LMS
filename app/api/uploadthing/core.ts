import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return { userId };
} 
 
// (req, res, { image }) => {}

export const ourFileRouter = {
    courseImage: 
        f({ image: { maxFileSize: "4MB", maxFileCount: 1 }})
        .middleware(() => auth())
        .onUploadComplete(() => {}),

    couseAttachment: 
        f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => auth())
        .onUploadComplete(() => {}),
        
    chapterVideo: 
        f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => auth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;