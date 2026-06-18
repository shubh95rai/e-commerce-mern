import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 mb-1">
            <p className="w-8 md:w-11 h-0.5 bg-[#414141] "></p>
            <p className="font-medium text-sm md:text-base">STYLE REDEFINED</p>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl sm:py-3 xl:text-5xl leading-relaxed prata-regular">
            OWN EVERY LOOK
          </h1>
          <div className="flex items-center gap-2 justify-end">
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-0.5 bg-[#414141] "></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img src={assets.hero_img} alt="hero-img" className="w-full sm:w-1/2" />
    </div>
  );
};
export default Hero;
