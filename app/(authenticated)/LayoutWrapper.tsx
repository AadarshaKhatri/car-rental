import NavigationBar from "./dashboard/components/Navigation/NavigationBar";
import Sidebar from "./dashboard/components/SideBar/SideBar";

const LayoutWrapper = ({children}: { children: React.ReactNode }) => {
  return (
    <section className="container max-w-full mx-auto overflow-x-hidden">
  

    
      <div className="flex flex-col md:flex-row justify-center items-start">

        {/* SideBar - Left Side */}
        <div className=" w-full flex flex-row md:fixed md:top-0 md:left-0 md:flex md:w-[80px] md:flex-col md:h-screen">
          <Sidebar/>
        </div>

        {/*Navigation Bar - Right Side */}
        <div className="w-full pl-0 md:pl-20 flex-1 md:mx-10">
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