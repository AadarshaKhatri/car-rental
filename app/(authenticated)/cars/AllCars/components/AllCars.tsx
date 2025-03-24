import { Checkboxes } from "../FilterForm"



const AllCars = () => {
  return (
    <section className="container max-w-full">
      <div className="flex flex-col justify-center items-center">
        
        {/* CheckBoxes Here */}
        <div>
          <Checkboxes/>
        </div>

      </div>
    </section>
  )
}

export default AllCars