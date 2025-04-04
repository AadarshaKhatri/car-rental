import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";


export async function GET (){
  try{
    const user  = await getUserId();
    if(!user) return null
    // const data = await prisma.car_model.findMany({
    //   where:{
    //     rentals:{
    //         every:{
    //           appliedUsers:{
    //             every:{
    //               status:"PENDING",
    //             }
    //           }
    //         },
    //     },
    //     authorId:user,        
    //   },
    //   include:{
    //     rentals:{
    //       select:{
    //         startDate:true,
    //         endDate:true,
    //         appliedUsers:{
    //           select:{
    //             status:true,
    //             applicant:{
    //               select:{
    //                 name:true,
    //                 id:true,
    //               }
    //             }
    //           }
    //         }
    //       }
    //     },
        
    //   }
    // })

    const data = await prisma.applied_users.findMany({
      where:{
        rentals:{
          
          authorId:user
        }
      },
      select:{
        status:true,
        applicant:{
          select:{  
            name:true,
            id:true,
          }
        },
        rentals:{
          select:{
            id:true,
            startDate:true,
            endDate:true,
            car:{
              select:{
                brand:true,
                id:true,
              }
            },
          } 
        },

      }
    })
    console.log("Request", JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  }catch(error){
    console.log("Error Fetching the data",error)
    return null
  }
}
