import { db } from "../db/db";
import { Photo } from "../models/Photo";
import {ObjectId} from 'mongodb'

interface PhotoServices{
    updateLikes(id: string, inc:number): Promise<Photo>;
    // createComment(id:string, commment:string): Promise<Photo>;
    createPhoto(photo: Photo): Promise<string>;
    getAllPhotos(): Promise<Photo[]>
}

const photosCollection = db.collection<Photo>("photos");

export const getAllPhotos= async (): Promise <Photo[]> => {
    const photos = await photosCollection.find().toArray()

    return photos;
};

export const createPhoto = async (photo: Photo): Promise<string> => {
   try{
    const res = await photosCollection.insertOne(photo);
    return res.insertedId.toString();
   }
   catch(error){
        return "something went wrong"
   }
}

export const updateLikes = async(id: string, inc: number = 1): Promise<Photo> => {
    const res = await photosCollection.findOneAndUpdate(
        {_id: new ObjectId(id)}, 
        {$inc: { likes: inc }}
    )
    const updatedPhoto = res.value as Photo

    return updatedPhoto
}

// export const createComment = async(id: string, commment: string): Promise<Photo> => {
//     return 
// }

export const photoServices: PhotoServices = {
    getAllPhotos, 
    createPhoto,
     updateLikes, 
    // createComment
 }