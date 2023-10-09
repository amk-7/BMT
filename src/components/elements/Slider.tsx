'use client';

import { Carousel } from 'flowbite-react';
import React from 'react';

interface SliderProps {
    names: string[];
}

const  Slider: React.FC<SliderProps> = ({names}) => {
  return (
    <Carousel slideInterval={5000}>
      { names.map((name) => (
        <img
            alt="..."
            src={`./images/sliders/${name}`}
        />
      )) }
    </Carousel>
  )
}

export default Slider;
