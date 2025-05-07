


const PageSkeleton = () => {
    return (
        <div   className="bg-cover bg-center bg-[#fff]">
        <div className='flex'>
        <div className='relative w-[20%] h-screen bg-gradient-to-b from-liblack via-liyellow to-liblack'>
        <div className='flex gap-5 mt-5 mb-10 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
         <div className='flex gap-5 mt-5 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
        <div className='flex gap-5 mt-20 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
        <div className='flex gap-5 mt-5 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
        <div className='flex gap-5 mt-5 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
        <div className='flex gap-5 mt-5 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
        <div className='flex gap-5 mt-10 ml-5'>
            <div className='w-[20%] p-4 rounded-lg animate-pulse bg-[#ffffff80]'></div>
             <div className='h-3 w-1/5   self-center   bg-[#ffffff80] rounded-full'></div>
        </div>
       
        </div>
        <div className=' w-[80%] flex flex-col items-center mt-10'>
        <div className='flex flex-col w-[100%] h-[80%] mb-10'>
            <div className='w-[40%] h-10  bg-[#ffffff80] animate-pulse rounded-lg self-center'></div>
             <div className='flex flex-col justify-center   items-center mt-5 gap-3 w-[100%]'>
                 <div className='w-[20%] h-5  bg-[#ffffff80] animate-pulse rounded-lg '></div>
                 <div className='w-[10%] h-3  bg-[#ffffff80] animate-pulse rounded-lg '></div>
             </div>
             <div className='self-center  mt-10 w-[80%] h-[100%] bg-[#ffffff80] animate-pulse rounded-lg'></div>  
        </div>
        <div  className='w-[80%] mx-auto flex justify-center bg-[#ffffff80] mb-5 h-10 animate-pulse'> </div>
        </div>
        </div>
        </div>
      );
}
 
export default PageSkeleton;