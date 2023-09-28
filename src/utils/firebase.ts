// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, updateMetadata, uploadBytes, uploadBytesResumable } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDBi_d5_owPsgyEOoMheCvrFbjfNVzExSs",
//   authDomain: "verbatim-d3d61.firebaseapp.com",
//   projectId: "verbatim-d3d61",
//   storageBucket: "buckets/verbatim-d3d61.appspot.com",
//   messagingSenderId: "792242525140",
//   appId: "1:792242525140:web:8fa57a0f092c3fbf493c41"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDBi_d5_owPsgyEOoMheCvrFbjfNVzExSs",
  authDomain: "verbatim-d3d61.firebaseapp.com",
  projectId: "verbatim-d3d61",
  storageBucket: "buckets/verbatim-d3d61.appspot.com",
  messagingSenderId: "792242525140",
  appId: "1:792242525140:web:52d1ac886c96434a493c41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
// const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Firestore Database


// type FormFields = {
//   name: string,
//   price: number
// }

/**
* Upload the product data with its
* image URL to the database.
* @returns Product id
*/
export const uploadData = async (
  //formFields: FormFields,
  file: File,
  fileName: string
) => {
  try {
    // const { name, price } = formFields;

    // Upload image.
    // const dataRef = ref(storage, `audio/test/${fileName}`);
    // //const uploadImage = await uploadBytes(dataRef, file);
    // console.log("dataRef")
    // // Create file metadata.
    // // const newMetadata = {
    // //   cacheControl: 'public,max-age=2629800000', // 1 month
    // //   contentType: uploadImage.metadata.contentType
    // // };

    // //await updateMetadata(dataRef, newMetadata);
    // await uploadBytes(dataRef, file)
    // console.log("upload bytes")
    // const uploadTask =await uploadBytesResumable(dataRef, file);
    // console.log("upou a task")
    // //const resp = await getDownloadURL(uploadTask.snapshot.ref)
    // // Get the image URL.
    // // const publicImageUrl = await getDownloadURL(dataRef)
    // const publicImageUrl = await getDownloadURL(uploadTask.ref)
    const storageRef = ref(storage,  `audio/test/${fileName}`);
    let publicImageUrl = await getDownloadURL(storageRef)
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      publicImageUrl
    });
    return publicImageUrl 
  } catch (error) {
    console.log(error);
  }
}