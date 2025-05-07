import { Link } from "react-router-dom";
import image from '../../public/Mobile login-pana.svg'


const Authentication = () => {
  


return (

<div className="flex flex-col items-center justify-center">

<img src={image} className="w-[30%]"/>
<div className="flex flex-col p-2 gap-2 items-center ">
    <h1 className="font-bold text-lg  text-tourism-orange">OOPs not Authenticated</h1>
    <p className="text-md">You cannot access this service</p>
    <div className="flex justify-center gap-2">
        <p>Please </p>
        
             <Link to={"/login"} className="underline text-tourism-dark-purple text-md font-medium ">log in </Link>
             or
             <Link to={"/signup"} className="underline text-tourism-dark-purple text-md font-medium " >Sign up</Link>
            
    </div>
</div>



</div>





);
};


export default Authentication; 