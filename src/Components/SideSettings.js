import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'






export default function SideSettings({ShowSettings , setShowSettings , tempunit , setTempUnit , showRecent , setShowRecent}) {

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
      React.useEffect(() => {
        /**
         *Close if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setShowSettings(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
  return (
   <div className={ShowSettings ? "side-settings px-4" : "side-settings hide"} ref={wrapperRef}>
    <span className='side-button d-flex justify-content-center align-items-center' onClick={()=>{setShowSettings(prevstate => !prevstate)}} >
    <FontAwesomeIcon icon={faGear} className={ShowSettings ? "spinner" : ""} />
    </span>
    <div className='text-light text-center my-3'>
    <h2>Settings</h2>
    <hr/>
    <div className='options'>



      <div className='option py-2 my-2 gap-2'>
        <h5 className='fw-bold px-3'>Temp Unit</h5>
        <hr className='m-0'/>
        <div className='d-flex justify-content-center align-items-center gap-2 py-2'>
        <span className={tempunit ? "":"text-muted"}>Kelvin</span>
       <span className={tempunit ? "onoff-button on":"onoff-button"} onClick={()=>{setTempUnit(prevstate => !prevstate)}}>
        <span className='pointer text-start'></span>
       </span>
       <span className={!tempunit ? "":"text-muted"}>Celicus</span>
        </div>
      </div>

      <div className='option py-2 my-2  gap-2'>
        <h5 className='fw-bold px-3'>Recent Search</h5>
        <hr className='m-0'/>
        <div className='d-flex justify-content-center align-items-center gap-2 py-2'>
        <span className={showRecent ? "":"text-muted"}>Show</span>
       <span className={showRecent ? "onoff-button on":"onoff-button"} onClick={()=>{setShowRecent(prevstate => !prevstate)}} >
        <span className='pointer text-start'></span>
       </span>
       <span className={!showRecent ? "":"text-muted"}>Hide</span>
        </div>
      </div>

    </div>
    </div>
   
   </div>
  )
}
