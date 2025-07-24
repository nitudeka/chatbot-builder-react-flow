const SideDrawer: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode  }> = (props) => { 
  if (!props.isOpen) return null

  return (
    <div className="relative">
      <div style={{ opacity: '0.7' }} onClick={props.onClose} className="fixed top-0 right-0 left-0 bottom-0 bg-black" />
      <div className="flex flex-col justify-between w-72 bg-white h-full fixed top-0 right-0">
	<div>
	  {props.children}
	</div>
	<div className="p-2 border-t">
	  <div className="w-full cursor-pointer relative inline-block px-4 py-2 font-medium group">
	    <span className="absolute inset-0 w-full h-full border-2 border-black bg-black"></span>
	    <p className="relative text-center text-white">
	      Close
	    </p>
	  </div>
	</div>
      </div>
    </div>
  )
}

export default SideDrawer
