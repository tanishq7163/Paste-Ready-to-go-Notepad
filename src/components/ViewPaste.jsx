import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useRef } from 'react';
import image from '../images/copysvg.svg'
import toast from 'react-hot-toast'


const ViewPaste = () => {
    const allPaste = useSelector((state)=>state.paste.pastes)
    const {id} = useParams()

    const paste = allPaste.filter((p)=>p._id === id)
    
    function handleCopy(){
        const content = paste[0].content;
        navigator.clipboard.writeText(content)
        toast.success("Copied to Clipboard")
    }

    const [key,setKey] = useState()
    const [elements,setElements] = useState([])
    

    const addElement = () =>{
        const newElement = <div className='' key={elements.length}>{elements.length+2}</div>
        setElements([...elements,newElement]);
    }


    function keyDown(event){
        if(key==='Enter'){
            addElement();
        }
        setKey(event.key)
    }

    const textareascroll = useRef(null)
    const divscroll = useRef(null)
    
        useEffect(() => {
          const handleScroll1 = () => {
            if(divscroll.current){
                divscroll.current.scrollTop = textareascroll.current.scrollTop;
                divscroll.current.scrollLeft = textareascroll.current.scrollLeft;
    
            }
          };
    
          const handleScroll2 = () => {
            if(textareascroll.current){
                textareascroll.current.scrollTop = divscroll.current.scrollTop;
                textareascroll.current.scrollLeft = divscroll.current.scrollLeft;
    
            }
          };
    
          const div1 = textareascroll.current;
          const div2 = divscroll.current;
    
          div1.addEventListener('scroll',handleScroll1);
          div2.addEventListener('scroll',handleScroll2);
    
        
          return () => {
            div1.removeEventListener('scroll',handleScroll1);
            div2.removeEventListener('scroll',handleScroll2);
          };
    
        }, [])

  return (
    <div className=''>
      <div className='flex flex-row gap-7 place-content-between w-full'>
              <input 
                  className=' cursor-not-allowed pl-5 rounded-2xl  w-[100%] place-content-evenly outline-none mt-2 bg-black p-4'
                  type='text'
                  placeholder='Enter Title Here'
                  value={paste[0].title}
                  disabled

              />
      
            
      </div>
      
              <div className='mt-7 min-w-[800px] bg-[#333]' >
      
                  <div className='w-full bg-[#333] h-[40px] flex items-center pl-3 justify-between pr-3'>
                      {/* tricolor */}
                      <div className='flex gap-1'>
                          <div className='w-[13px] h-[13px] rounded-full bg-red-400'></div>
                          <div className='w-[13px] h-[13px] rounded-full bg-yellow-400'></div>
                          <div className='w-[13px] h-[13px] rounded-full bg-green-400'></div>
                      </div>
      
                      {/* copy button */}
                      <button className='outline-none' onClick={handleCopy}> 
                          <img src={image} width={15} height={25} />
                      </button>
                      
                  </div>
      
      
      
                  <div className='flex box-border h-[620px] pl-0.5 pr-0.5'>
                      <div ref={divscroll} className='dark:bg-[#0f0f0f] min-w-[50px] pt-2.5 text-[15px] flex flex-col box-border  w-12 bg-neutral-2 font-mono dark:text-white text-right pr-2 text-sm rounded-l-[0.5rem] max-h-[620px] overflow-hidden'>
                          <div>1</div>
                          {elements}
                      </div>
                      <textarea 
                          ref={textareascroll}
                          onKeyDown={keyDown}
                          className='
                                    cursor-not-allowed
                                  [&::-webkit-scrollbar]:w-2
                                  [&::-webkit-scrollbar-track]:rounded-full
                                  [&::-webkit-scrollbar-track]:bg-gray-100
                                  [&::-webkit-scrollbar-thumb]:rounded-full
                                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                          min-h-[300px] text-sm overflow-y-scroll border-none rounded-none focus:ring-0 pt-2.5 w-full bg-neutral-2 dark:bg-[#0f0f0f] font-normal placeholder:text-gray-300 focus:outline-none resize-none dark:text-white dark:caret-white leading-[1.5]'
                          value={paste[0].content}
                          placeholder='Enter Content here'
                          rows={20}
                          cols={55}
                          disabled
                          
                      />
                  </div>
                  
              </div>
    </div>
  )
}

export default ViewPaste
