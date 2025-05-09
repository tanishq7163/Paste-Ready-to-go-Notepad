import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import image from '../images/copysvg.svg'
import toast from 'react-hot-toast';
import { useRef } from 'react';


const Home = () => {
    const [title,setTitle] = useState('');
    const [value,setValue] = useState('');  
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteID');
    
    const dispatch = useDispatch();
    const allPaste = useSelector((state)=>state.paste.pastes)

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
    

    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        setTitle("")
        setValue("")
        setSearchParams({});

    }
    useEffect(()=>{
        if(pasteId){
            const paste = allPaste.find((p)=>p._id===pasteId)
            setTitle(paste.title)
            setValue(paste.content)
        }
    },[pasteId])

    function handleCopy(){
        const content = value;
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

  return (
    <div className='mt-8'>
        <div className='flex flex-row gap-7 place-content-between w-full'>
        <input 
            className=' pl-5 rounded-2xl  w-[80%] place-content-evenly outline-none mt-2 bg-black'
            type='text'
            placeholder='Enter Title Here'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <button 
        onClick={createPaste}
        className=' btn-grad p-3 rounded-2xl place-content-evenly mt-2'>
            {
                pasteId ? "Update Paste" : "Create Paste"
            }
        </button>
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
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                    min-h-[300px] text-sm overflow-y-scroll border-none rounded-none focus:ring-0 pt-2.5 w-full bg-neutral-2 dark:bg-[#0f0f0f] font-normal placeholder:text-gray-300 focus:outline-none resize-none dark:text-white dark:caret-white leading-[1.5]'
                    value={value}
                    placeholder='Enter Content here'
                    onChange={(e)=> setValue(e.target.value)}
                    rows={20}
                    cols={55}
                />
            </div>
            
        </div>
    </div>
  )
}

export default Home
