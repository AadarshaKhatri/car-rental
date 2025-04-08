import LayoutWrapper from "../../LayoutWrapper"
import CarInformation from "./components/CarInformation/CarInformation"



const CarsUniquePage = () => {
  return (
    <LayoutWrapper>
      <section className="w-full">
        <div className="w-full flex flex-col justify-center items-start gap-2">
            <CarInformation/>
          
        </div>
      </section>
    </LayoutWrapper>
  )
}

export default CarsUniquePage