const SideDrawer: React.FC<{ title: string; isOpen: boolean; onClose: () => void; children: React.ReactNode  }> = (props) => { 
  if (!props.isOpen) return null

  return (
    <div className="relative">
      <div className="border-l flex flex-col justify-between w-72 bg-white h-full fixed top-0 right-0">
	<div>
	  <div className="p-2 font-semibold text-lg border-b">
	    {props.title}
	  </div>
	  <div className="px-2">
	    {props.children}
	  </div>
	</div>
	<div className="p-2 border-t">
	  <div className="w-full cursor-pointer relative inline-block px-4 py-2 font-medium group">
	    <span className="absolute inset-0 w-full h-full border-2 border-black bg-black"></span>
	    <p onClick={props.onClose} className="relative text-center text-white">
	      Close
	    </p>
	  </div>
	</div>
      </div>
    </div>
  )
}

export default SideDrawer
