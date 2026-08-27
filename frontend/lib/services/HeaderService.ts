import { HomeProductListProps } from "@/app/(home)/products/HomeProduct";

export type Category = {
  name: string;
  slug: string;
};



export const HeaderService = async(): Promise<Category[]> => {
  try{
     const response = await fetch("https://dummyjson.com/products/categories")
      //const categories = await (await response).json()
   const categories: Category[] = await response.json();

    return categories.slice(0, 5);
  }
  catch{
       console.log("Error fetching Category");
       return [];
  }
}
