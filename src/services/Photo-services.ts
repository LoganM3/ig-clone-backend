import { db } from "../db/db";
import { Photo } from "../models/Photo";

interface PhotoServices{
    updateLikes(id: string, inc:number): Promise<Photo>;
    createPhoto(photo: Photo): Promise<string>;
    createComment(id:string, commment:string): Promise<Photo>;
    getAllPhotos(): Promise<Photo[]>
}

const photosCollections = db.collection<Photo>("photos");

export const getAllPhotos= async (): Promise <Photo[]> => {
    const photos = await photosCollections.find().toArray()

    return photos;
};