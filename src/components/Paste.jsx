import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { CiCalendar } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";








const Paste = () => {
    const pastes = useSelector((state)=>state.paste.pastes)
    const dispatch = useDispatch();

    const [searchTerm,setSearchTerm] = useState('');

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));
    }

    function handleCopy(paste){
        navigator.clipboard.writeText(paste?.content)
        toast.success("Copied to Clipboard")
    }


    
    

  return (
    <div>
      <input
      className='p-2 rounded-2xl min-w-[500px] mt-5 bg-[#1a1a1a]'
      type='search'
      placeholder='Search Here'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      />
    <div className='flex flex-col gap-5 mt-6 min-w-[700px]'>
         {
            filteredData.length>0 && 
            filteredData.map((paste)=>{
                
                return(
                    <div className='border-[#646cff]  border-1 p-6 rounded-2xl min-w-[500px] max-w-[900px]' key={paste?._id}  >
                        <div className='flex flex-col justify-items-start items-start gap-4'>   
                            <div className=''>
                                <p className='text-[26px]'>{paste.title}</p>
                            </div>

                            <div className='text-left text-[13px]'>
                                {paste.content.substr(0,300)+"...."}
                            </div>
                        </div>
                        
                        
                        <div className='mt-5'>
                            <div className='flex flex-row place-content-evenly mt-3'>
                                <button>
                                    <NavLink to={`/?pasteID=${paste?._id}`} >
                                        <CiEdit size={21}/>
                                    </NavLink>
                                </button>
                                <button >
                                    <NavLink  to={`/pastes/${paste?._id}`}><IoEyeOutline size={21} /></NavLink>
                                </button>
                                <button onClick={() => handleDelete(paste?._id)}><AiOutlineDelete size={21}/></button>
                                <button onClick={()=> handleCopy(paste)}><MdContentCopy size={21} /></button>
                                <button><FaShareFromSquare size={21} /></button>
                            </div>
                            
                            <div className='mt-5 flex flex-row items-center'>
                                {/* {paste.createdAt} */}
                                {/* {paste.createdAt} */}
                                <CiCalendar size={27} />
                                {monthNames[new Date(paste.createdAt).getMonth()]},&nbsp;
                                {new Date(paste.createdAt).getFullYear()} &nbsp;
                                
                            </div> 
                        </div>
                       

                    </div>
                )
            })
         }
    </div>
    </div>
  )
}

export default Paste
