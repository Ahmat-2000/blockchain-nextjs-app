import { BiSearchAlt } from "react-icons/bi";
import { BsShieldFillCheck } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";

const servicesData = [
  {
    color : "bg-[#2952E3]" ,
    title : "Security Guaranteed", 
    subtitle : "Security is guaranted. We always maintain privacy and mainting the quality of our products. ",
    icon : <BsShieldFillCheck fontSize={25} className="text-white" />
  },
  {
    color : "bg-[#8945F8]" ,
    title : "Best exchange rates" ,
    subtitle : "Security is guaranted. We always maintain privacy and mainting the quality of our products. ",
    icon : <BiSearchAlt fontSize={25} className="text-white" />
  },
  {
    color : "bg-[#F84550]" ,
    title : "Fastest transactions" ,
    subtitle : "Security is guaranted. We always maintain privacy and mainting the quality of our products. ",
    icon : <RiHeart2Fill fontSize={25} className="text-white" />
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceCard = ({color, title , icon , subtitle}: any) => {
  return(
    <div className="flex justify-between items-center white-glassmorphism py-2 px-3 cursor-pointer gap-3 hover:shadow-pink-500 duration-500 sm:flex-row shadow-teal-500 shadow-md">
      <div className={`p-3 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1 max-w-md">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-md">{subtitle}</p>
      </div>
    </div>
  );
};


const Services = () => {
  return (
    <div className="flex flex-col w-full gardient-bg-services p-4 gap-10 sm:flex-row md:pr-2 sm:items-center sm:justify-between">
      <h1 className="py-2 text-gradient text-4xl sm:text-[50px] flex flex-col gap-2">
        <span>Services that we</span> 
        <span>continue to improve</span>
      </h1>

      <div className="flex flex-col gap-4 md:w-2/5 max-w-lg">
        {
          servicesData.map((item, index) => (
            <ServiceCard 
              key={index}
              color={item.color} 
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            />)
          )
        }
      </div>
    </div>
  )
}

export default Services;