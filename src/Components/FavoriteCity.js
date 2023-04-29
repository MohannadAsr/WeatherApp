import React from 'react'
import axios from "axios"

export default function FavoriteCity({fav ,tempunit ,setCity , setShowFavorites }) {

    const [data , setData] = React.useState()
    const [background , setBackground] = React.useState("cloudtheme.JPG")


    React.useEffect(()=>{

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${fav}&appid=3ca60b4ea8bce1fdcd4829718903a1bd`).then(res=> setData(res.data))

    },[fav])




    React.useEffect(()=>{

        if(data) {
    
          
        switch(data.weather[0].main) {
          case "Clear" :
            setBackground("cleartheme.JPG")
            break;
            case "Clouds" :
              setBackground("cloudtheme.JPG")
              break;
              case "Rain" :
                setBackground("raintheme.JPG")
                break;
                case "Drizzle" :
                  setBackground("drizzle.jfif")
                break;
                case "Mist" :
                  setBackground("misttheme.JPG")
                  break;
                  case "Snow" :
                  setBackground("snowtheme.JPG")
                  break;
                default :
                setBackground("cleartheme.JPG")
        }
    
        }
    
        else{
          setBackground("bg.jfif")
        }
    
      },[data])
    

    function action() {
        setCity(data.name.split(" ")[0])
        setShowFavorites(false)

        console.log(data.name.split(" ")[0])
    }

  return (
   <>
    {data && <div className='fav p-2 my-2 gap-2 text-dark 'style={{backgroundImage : `url(${require(`../Images/${background}`)})`}}>  
    <div className='info d-flex justify-content-around' onClick={()=>{action()}}>
      
         <span className='fw-bold'>  {data.name.length > 10 ? data.name.split(" ")[0] : data.name}</span> 
         <span>{data.weather[0].main}</span>
         <span className='fw-bold'>{tempunit ? `${data.main.temp}°K` : `${(data.main.temp - 273.15).toFixed(0)}°C`}</span>
         
    </div>
    </div> }
    </>
  )
}
