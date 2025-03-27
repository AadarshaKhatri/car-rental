import NavigationBar from "./dashboard/components/Navigation/NavigationBar";
import Sidebar from "./dashboard/components/SideBar/SideBar";

const LayoutWrapper = ({children}: { children: React.ReactNode }) => {
  return (
    <section className="container max-w-full mx-auto overflow-x-hidden">

      <div className="flex flex-row justify-center items-start">

        {/* SideBar - Left Side */}
        <div className="fixed top-0 left-0 md:flex md:w-[80px] md:flex-col h-screen">
          <Sidebar/>
        </div>

        {/*Navigation Bar - Right Side */}
        <div className="pl-30 md:pl-20 flex-1 md:mx-10">
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