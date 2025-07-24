const SideDrawer: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode  }> = (props) => { 
  if (!props.isOpen) return null

  return (
    <div className="relative">
      <div style={{ opacity: '0.7' }} onClick={props.onClose} className="fixed top-0 right-0 left-0 bottom-0 bg-black" />
      <div className="w-72 bg-white h-full fixed top-0 right-0">
	{props.children}
      </div>
    </div>
  )
}

export default SideDrawer
