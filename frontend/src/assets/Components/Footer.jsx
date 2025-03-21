import { FaCopyright, FaInstagram, FaFacebookSquare,FaTwitter, FaLinkedinIn } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className=" m-auto bg-azul p-3  w-full ">
        <div className="flex flex-row max-w-[1240px]  justify-between items-center m-auto p-3 text-white">
            <p className="flex items-center gap-3"> <FaCopyright/> 2024 | Easy Stay</p>
            <div className="flex flex-row items-center justify-center gap-4 text-xl">
                <FaLinkedinIn  className="cursor-pointer hover:text-celesteOscuro"/>
                <FaInstagram  className="cursor-pointer hover:text-celesteOscuro"/>
                <FaFacebookSquare className="cursor-pointer hover:text-celesteOscuro"/>
                <FaTwitter className="cursor-pointer hover:text-celesteOscuro"/>
            </div>
        </div>
    </div>
  )
}


export default Footer