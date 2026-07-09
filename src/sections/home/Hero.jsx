import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroData from '../../data/hero-sections.json';
import BrochureModal from '../../components/BrochureModal';

// Import assets
import homeVideo from '../../assets/video/hero-video.mp4';
import citizenshipBg from '../../assets/images/citizenship.png';
import flagAsset from '../../assets/flags/grenada-flag.png';

const assetMap = {
  homeVideo,
  citizenshipBg,
  flagAsset,
};

const Hero = ({ page = 'home' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const content = heroData[page];
  const isCitizenshipPage = page === 'citizenship';
  const heroContentMaxWidthClass = 'max-w-[1400px]';

  if (!content) return null;

  const {
    title,
    description,
    primaryButton,
    secondaryButton,
    background,
    flag,
    showBlueEffect,
  } = content;

  return (
    <div className="w-full bg-gray-50 p-2 lg:p-[10px]">
      <section
        className={`relative w-full h-[95vh] flex flex-col justify-end lg:flex-row ${isCitizenshipPage ? 'lg:items-end lg:justify-start' : 'lg:items-center lg:justify-start'} py-0 lg:py-8 px-0 lg:px-20 rounded-[28px] overflow-hidden shadow-2xl`}
        style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {background.type === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center scale-105"
            >
              <source src={assetMap[background.src]} type="video/mp4" />
            </video>
          ) : (
            <img
              src={assetMap[background.src]}
              alt="Hero Background"
              className="w-full h-full object-cover object-center"
            />
          )}

          {/* Desktop Overlay: Left-side gradient for text visibility */}
          <div
            className={`absolute inset-0 hidden lg:block ${isCitizenshipPage ? 'bg-gradient-to-l from-black/60 via-black/20 to-transparent' : 'bg-gradient-to-r from-black/60 via-black/20 to-transparent'}`}
          />
          
          {/* Mobile & Tablet Overlay: bottom-heavy gradient so text is readable at bottom */}
          <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Blue effect for content background if specified */}
          {showBlueEffect && (
            <div className="absolute inset-0 bg-blue-600/20 mix-blend-soft-light" />
          )}

          {/* Subtle Global Darkener for extra contrast */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Content */}
        <div className={`relative z-10 w-full ${heroContentMaxWidthClass} mx-auto px-6 lg:px-0 pb-12 lg:pb-0`}>
          {/* Inner content block */}
          <div
            className={`flex flex-col text-left lg:max-w-[70%] md:max-w-[80%] ${isCitizenshipPage ? 'gap-4 lg:gap-3' : 'gap-5 md:gap-5 lg:gap-4'}`}
          >
            <div className={`flex flex-col ${isCitizenshipPage ? 'gap-3 md:gap-3 lg:gap-4' : 'gap-4 md:gap-4 lg:gap-6'}`}>
              <h1
                className={`font-bold uppercase tracking-normal text-white drop-shadow-lg whitespace-pre-line ${
                  isCitizenshipPage
                    ? 'text-[24px] leading-[115%] md:text-[32px] md:leading-[112%] lg:text-[42px] lg:leading-[110%]'
                    : 'text-[28px] leading-[115%] md:text-[36px] md:leading-[112%] lg:text-[50px] lg:leading-[110%]'
                }`}
              >
                {title}
              </h1>

              <p
                className={`text-white font-bold tracking-normal max-w-2xl opacity-95 ${
                  isCitizenshipPage
                    ? 'text-[12px] leading-[145%] md:text-[13px] md:leading-[150%] lg:text-[15px] lg:leading-[155%]'
                    : 'text-[14px] leading-[150%] md:text-[15px] md:leading-[155%] lg:text-[18px] lg:leading-relaxed'
                }`}
              >
                {description}
              </p>
            </div>

            {/* Buttons */}
            <div
              className={`flex flex-row items-stretch w-full md:w-auto ${
                isCitizenshipPage ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4 lg:gap-5'
              }`}
            >
              <Link
                to="/contact"
                className={`flex-1 md:flex-none rounded-[10px] bg-[#C9A84C] hover:bg-[#b5933c] hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-white transition-all duration-300 ease-out shadow-xl flex items-center justify-center font-sans font-normal uppercase tracking-wider ${
                  isCitizenshipPage
                    ? 'md:w-[160px] lg:w-[190px] h-[44px] md:h-[48px] lg:h-[50px] text-[12px] md:text-[14px] lg:text-[16px]'
                    : 'md:w-[150px] lg:w-[150px] h-[46px] md:h-[48px] lg:h-[50px] text-[12px] md:text-[14px] lg:text-[16px]'
                }`}
              >
                {primaryButton}
              </Link>
              {secondaryButton.toLowerCase().includes('brochure') ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`flex-1 md:flex-none rounded-[10px] bg-white hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-gray-900 transition-all duration-300 ease-out shadow-xl flex items-center justify-center font-sans font-normal uppercase tracking-wider ${
                    isCitizenshipPage
                      ? 'md:min-w-[160px] lg:min-w-[190px] md:w-auto px-5 lg:px-6 h-[44px] md:h-[48px] lg:h-[50px] text-[12px] md:text-[14px] lg:text-[16px]'
                      : 'md:min-w-[150px] lg:min-w-[170px] md:w-auto px-6 lg:px-8 h-[46px] md:h-[48px] lg:h-[50px] text-[12px] md:text-[14px] lg:text-[16px]'
                  }`}
                >
                  {secondaryButton}
                </button>
              ) : (
                <Link
                  to="/contact"
                  className={`flex-1 md:flex-none rounded-[10px] bg-white hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-gray-900 transition-all duration-300 ease-out shadow-xl flex items-center justify-center font-sans font-normal uppercase tracking-wider ${
                    isCitizenshipPage
                      ? 'md:min-w-[160px] lg:min-w-[190px] md:w-auto px-5 lg:px-6 h-[44px] md:h-[48px] lg:h-[50px] text-[12px] md:text-[14px] lg:text-[16px]'
                      : 'md:min-w-[150px] lg:min-w-[170px] md:w-auto px-6 lg:px-8 h-[46px] md:h-[48px] lg:h-[50px] text-[12px] md:text-[14px] lg:text-[16px]'
                  }`}
                >
                  {secondaryButton}
                </Link>
              )}
            </div>

            {/* Flag if provided */}
            {flag && (
              <div className={`${isCitizenshipPage ? 'mt-1 md:mt-2 lg:mt-3' : 'mt-2 md:mt-4 lg:mt-6'}`}>
                <img
                  src={assetMap[flag]}
                  alt="Flag"
                  className={`h-auto object-contain drop-shadow-xl ${isCitizenshipPage ? 'w-[100px] md:w-[120px] lg:w-[140px]' : 'w-[120px] md:w-[150px] lg:w-[180px]'}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      <BrochureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brochurePath={null} // Will use default message
      />
    </div>
  );
};

export default Hero;
