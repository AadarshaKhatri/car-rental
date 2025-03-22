
import LayoutWrapper from "../LayoutWrapper"
import Cars from "../components/CarList/CarListCard"

const DashboardPage = () => {
  
  return (
      <LayoutWrapper>
        <div className="w-full flex flex-col justify-between items-center">

        
          <div className="w-full flex flex-col  justify-start items-start gap-5">
            <h2>Popular Cars</h2>

            <div className="flex flex-wrap justify-start items-center gap-5">
              {/* Cards Here*/}
              {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}><Cars/></div>
                ))}
            </div>
          </div>

          <div className="w-full flex flex-col  justify-start items-start gap-5 py-10">
            <h2>Recommended Cars</h2>

            <div className="flex flex-wrap justify-start items-center gap-5">
              {/* Cards Here*/}
              {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}><Cars/></div>
                ))}
            </div>
          </div>
        </div>
       </LayoutWrapper>



  )
}

export default DashboardPage