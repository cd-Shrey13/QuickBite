import React from 'react';
import { menu_list } from '../../assets/assets.js';
import H1 from '../../components/H1.jsx';

function MenuOptions() {
  return (
    <section className="w-full bg-[#fdf3e7] px-4 py-10 font-Satoshi">
      <div className="max-w-screen-xl mx-auto rounded-2xl border border-[#f3e1c7] bg-[#fffaf4] p-6 text-left shadow-md sm:p-10">
        <H1 className="text-black mb-4">Explore our <br /> menu</H1>
        <p className="text-md max-w-2xl text-black mb-6 leading-relaxed sm:text-lg">
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise. Our mission is to satisfy
          your cravings and elevate your dining experience, one delicious meal at a time.
        </p>

        <MenuSlider />
      </div>
    </section>
  );
}

function MenuSlider() {
  return (
    <div className="no-scrollbar flex gap-6 overflow-x-auto snap-x scroll-smooth pb-4 pt-2">
      {menu_list.map((item, i) => (
        <SliderCard key={i} cardImage={item.menu_image} cardImageName={item.menu_name} />
      ))}
    </div>
  );
}

function SliderCard({ cardImage, cardImageName }) {
  return (
    <div className="snap-start shrink-0 w-[160px] sm:w-[180px] md:w-[200px] flex flex-col items-center bg-white/60 backdrop-blur-lg rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-white/30">
      <img
        src={cardImage}
        alt={cardImageName}
        className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover mt-4 border-4 border-white"
      />
      <h2 className="text-center font-semibold text-lg mt-4 mb-5 text-black">{cardImageName}</h2>
    </div>
  );
}

export default MenuOptions;
