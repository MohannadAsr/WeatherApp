import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Search({setCity}) {

    const searching = React.useRef()


    function fun(){
        setCity(searching.current.value)
        console.log(searching.current.value)
    }

    function funck (e) {


       if(e.key === "Enter") {
        fun()
       }

    }
  return (

    <section className='search-bar  text-center py-4 '>

<InputGroup className="mb-3  px-2 ">
        <Form.Control
          placeholder="Search By City Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
           className='fs-5 '
           ref={searching}
           onKeyUp={(e)=>{funck(e)}}
          
        />
        <Button variant="outline-secondary"   id="button-addon2" className='fs-3' onClick={()=>{fun()}} >
          Search
        </Button>
      </InputGroup>

    </section>

  )
}
