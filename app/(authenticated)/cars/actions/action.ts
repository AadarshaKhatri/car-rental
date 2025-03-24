import { PrevState } from "@/lib/types";

// ================ Server Action to Create Cars =========================
export async function createCars(prevState:PrevState, formData:FormData): Promise<PrevState>{
  console.log("Car Create Hit!");
  try{
    if(!formData){
      return {
        success:false,
        error:"No Form Data",
        message:null
      }
    }

    
  }catch(error){
    console.log(`${error}`);
  }
}

// ======================= Server Action to Delete Cars ==========================
export async function deleteCars(){
  try{

  }catch(error){
    console.log(`${error}`)
  }
}

