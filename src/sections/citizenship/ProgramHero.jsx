import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import citizenshipBg from '../../assets/images/citizenship.png';
import { getBrochurePath } from '../../data/brochures';
import BrochureModal from '../../components/BrochureModal';

const ProgramHero = ({ program }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroImage = program.heroImage || citizenshipBg;
  const category = program.categoryLabel || 'citizenship by investment';
  const brochurePath = getBrochurePath(program.slug);

  return (
    <div className="w-full bg-gray-50 p-2 lg:p-[10px]">
      <section
        className="relative isolate w-full h-[95vh] flex flex-col justify-end lg:flex-row lg:items-end lg:justify-start py-0 lg:py-8 px-0 lg:px-20 rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-2xl"
        style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroImage}
            alt={`${program.name} ${category}`}
            className="w-full h-full object-cover object-center"
          />

          {/* Desktop Overlay */}
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
          {/* Mobile & Tablet Overlay */}
          <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-blue-600/20 mix-blend-soft-light" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-0 pb-8 lg:pb-0">
          <div className="flex flex-col text-left md:max-w-[80%] lg:max-w-[70%] gap-3 lg:gap-3 max-w-[680px] mb-6">
            <div className="flex flex-col gap-2.5 md:gap-3 lg:gap-4">
              <h1 className="font-bold uppercase tracking-normal text-white drop-shadow-lg whitespace-pre-line text-[22px] leading-[112%] md:text-[30px] md:leading-[112%] lg:text-[42px] lg:leading-[110%]">
                {program.heroTitle}
              </h1>

              <p className="text-white font-bold drop-shadow-md tracking-normal max-w-2xl opacity-95 text-[11px] leading-[150%] md:text-[13px] md:leading-[150%] lg:text-[15px] lg:leading-[155%]">
                {program.heroDescription}
              </p>
            </div>

            <div className="flex flex-row items-stretch w-full md:w-auto gap-2 md:gap-3">
              <Link to="/contact" className="flex-1 md:flex-none md:w-[150px] lg:w-[190px] min-h-[40px] md:h-[48px] lg:h-[54px] text-[10px] md:text-[13px] lg:text-[16px] rounded-[10px] bg-[#C9A84C] hover:bg-[#b5933c] hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-white transition-all duration-300 ease-out shadow-xl flex items-center justify-center font-sans font-semibold lg:font-normal uppercase tracking-[0.12em] lg:tracking-wider px-4 text-center">
                Apply Now
              </Link>
              {brochurePath.startsWith('/Brochure/') ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 md:flex-none md:min-w-[150px] lg:min-w-[190px] md:w-auto px-4 md:px-5 lg:px-6 min-h-[40px] md:h-[48px] lg:h-[54px] text-[10px] md:text-[13px] lg:text-[16px] rounded-[10px] bg-white hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-gray-900 transition-all duration-300 ease-out shadow-xl flex items-center justify-center font-sans font-semibold lg:font-normal uppercase tracking-[0.08em] lg:tracking-wider text-center whitespace-normal leading-[1.25]"
                >
                  Download Brochure
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="flex-1 md:flex-none md:min-w-[150px] lg:min-w-[190px] md:w-auto px-4 md:px-5 lg:px-6 min-h-[40px] md:h-[48px] lg:h-[54px] text-[10px] md:text-[13px] lg:text-[16px] rounded-[10px] bg-white hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-gray-900 transition-all duration-300 ease-out shadow-xl flex items-center justify-center font-sans font-semibold lg:font-normal uppercase tracking-[0.08em] lg:tracking-wider text-center whitespace-normal leading-[1.25]"
                >
                  Download Brochure
                </Link>
              )}
            </div>

            <div className="mt-1 md:mt-2 lg:mt-3">
              <img
                src={program.flag}
                alt={`${program.name} flag`}
                className="h-auto object-contain drop-shadow-xl w-[82px] md:w-[110px] lg:w-[140px] rounded-[6px]"
              />
            </div>
          </div>
        </div>
      </section>

      <BrochureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brochurePath={brochurePath}
      />
    </div>
  );
};

export default ProgramHero;
