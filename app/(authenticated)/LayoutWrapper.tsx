import NavigationBar from "./dashboard/components/Navigation/NavigationBar";
import Sidebar from "./dashboard/components/SideBar/SideBar";



const LayoutWrapper = ({children}: { children: React.ReactNode }) => {
  return (
    <section className="container max-w-full mx-auto">

      <div className="flex flex-row justify-center items-start">

        {/* SideBar - Left Side */}
        <div className=" md:flex md:w-[80px] md:flex-col h-screen">
          <Sidebar/>
        </div>

        {/*Navigation Bar - Right Side */}
        <div className="flex-1 md:mx-10">
          <div className="flex flex-col justify-center items-center">
            <NavigationBar/>
            {children}
          </div>
          </div>
      </div>

    </section>


  )
}

export default LayoutWrapper