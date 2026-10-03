import axiosClient from "./apiclient"
export interface ICategory {
  createdBy: {
    email: string;
    role: string;
    _id: string;
  };
  image: string;
  name: string;
  parent: null;
  slug: string;
  status: string;
  updatedBy: {
    email: string;
    role: string;
    _id: string;
  };
  _id:string
}
export const  getCategoryList =async()=>{
  try {
    const response = await axiosClient.get ("/category/all-cats") as unknown as {data:Array<ICategory>}
    console.log(response)
    return response.data
    
  } catch  {
    console.log ("Error fetching Category")
    
  }
}