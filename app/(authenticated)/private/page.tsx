import LogoutButton from "./components/LogoutButton/LogoutButton"

const PrivatePage = () => {
  return (
    <section className="container max-w-full mx-auto">
      <div className="flex flex-row justify-between items-center">
        
        <div className="">
          <h2>Logo Here</h2>
        </div>

        <div className="flex">
          <LogoutButton/>
        </div>

      </div>
    </section>


  )
}

export default PrivatePage