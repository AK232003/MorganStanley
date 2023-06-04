// import React, { useState } from 'react';
// import {  Carousel,CarouselItem} from 'reactstrap';
// import image1 from "../assets/banner-1.jpg";
// import image2 from "../assets/banner-2.jpg";
// import image3 from "../assets/banner-3.jpg";
// const items = [
//   {
//     src: image1,
//     altText: 'Slide 1',
//     key: 1,
//   },
//   {
//     src: image2,
//     altText: 'Slide 2',
//     key: 2,
//   },
//   {
//     src: image3,
//     altText: 'Slide 3',
//     key: 3,
//   },
// ];

// function Carausel() {
//     const [activeIndex, setActiveIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   const next = () => {
//     if (animating) return;
//     const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
//     setActiveIndex(nextIndex);
//   };

//   const previous = () => {
//     if (animating) return;
//     const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//     setActiveIndex(nextIndex);
//   };

//   const goToIndex = (newIndex) => {
//     if (animating) return;
//     setActiveIndex(newIndex);
//   };

//   const slides = items.map((item) => {
//     return (
//       <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
//         <img src={item.src} alt={item.altText} />
//       </CarouselItem>
//     );
//   });

//   return (
//     <Carousel activeIndex={activeIndex} next={next} previous={previous} ride="carousel" fade={true} keyboard={false}>
//       {slides}
//     </Carousel>

//   );
// }

// export default Carausel;