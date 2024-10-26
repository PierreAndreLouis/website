import React, { useContext } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';


function PC_header() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
  };

  const { handleLogout } = useContext(DataContext);


  // const handleClick = () => {
  //   window.scrollTo({
  //       top: 0,
  //       behavior: 'auto'
  //       // behavior: 'smooth'
  //   });
  return (
    <div className='z-20 bg-blue-950 hidden md:block  p-3 md:px-16 fixed left-0 top-0 right-0 shadow-md text-gray-200'>
        <div className='flex justify-between items-center'>
            <div className='flex cursor-default gap-2 items-center'>
              <img className='w-8' src="/img/cars/logo.png" alt="" />
              <h2 className='font-bold text-xl'>Octagono-<span className='text-orange-500'>Plus</span></h2>
              </div>
            <div className='flex gap-6'>
                <Link onClick={() => {handleClick()}} to="/home" className='hover:text-orange-300' >Home</Link>
                <Link onClick={() => {handleClick()}} to="/ajouter_vehicule" className='hover:text-orange-300' >Ajouter</Link>
                <Link onClick={() => {handleClick()}} to="/modifier_vehicule" className='hover:text-orange-300' >Modifier/Supprimer</Link>
                {/* <a className='hover:text-orange-300' >Monitoring</Link> */}
                <Link onClick={() => {handleClick()}} to="/paiement" className='hover:text-orange-300' >Payer</Link>
               <div onClick={handleLogout}><FaUserCircle className="text-2xl hover:text-orange-300 cursor-pointer text-gray-200" /></div> 
                </div>
        </div>
    </div>
  )
}

export default PC_header