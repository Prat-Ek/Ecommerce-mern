

export default function Skeleton({row=10,cols}:Readonly<{row?:number,cols:number}>) {
  return (
   <>
   {
    [...Array(row)].map((_,index:number)=>(
        <tr key={index}>
            {
                [...Array(cols)].map((_, inx:number)=>(
 <td className="p-3 border border-gray-800" key={`col-${inx}`}><p className="w-full h-2 bg-gray-400 rounded-full p-1.5 animate-pulse"></p></td>
                ))
            }
           
          
          </tr>
    ))
   }
   </>
  )
}
