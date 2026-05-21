import "./navbar.css"
import myLogo from "../assets/Logo-bg-remove-3.png"

function Navbar() { 
    return (
        <nav className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow-md">
          {/* Logo Container */}
          <div className="flex items-center">
            <img src={myLogo} alt="Logo" className="h-9 w-auto object-contain" />
          </div>

          {/* Developer Mode */}
          <div className="flex border-0 bg-blend-color">

            <div className="flex">
                <h2 className="text-white">Developer Mode</h2>

                {/* toggle switch } */}

                <div className="">
                    <button className="relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300">
                        <span
                          className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300"
                        />
                </button>
                </div>
                
            </div>

          </div>
        </nav>

            
            
    )
}

export default Navbar
