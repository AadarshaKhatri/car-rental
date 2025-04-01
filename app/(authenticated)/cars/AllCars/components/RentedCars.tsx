

const RentedCars = () => {
  
  return (
    <div className="w-[350px]">
            <h2 className="text-lg text-center pb-5">Cars you have rented!</h2>
            <div className="w-[350px] p-5 shadow-md rounded-lg border border-primary flex items-center gap-4">
                {/* Car Image */}
                <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center">
                  {/* <img src="/" className="w-full h-full object-cover rounded-md" /> */}
                </div>

                {/* Car Details */}
                <div className="flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-primary">Brand of the car</h2>
                  <p className="text-sm text-gray-300">Price: $25/day</p>
                  <p className="text-sm text-gray-300">Rented till: 5th March</p>
                </div>
      </div>
    </div>
  )
}

export default RentedCars