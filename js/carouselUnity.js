const carouselUn = document.querySelector('.unity');
const firstDivUn = carouselUn.querySelectorAll('img')[0];
const arrowIconsUn = document.querySelectorAll('.carousel-unity i')

let isDragStartUn = false;
let isDraggingUn = false;
let prevPageXUn;
let prevScrollLeftUn;
let positionDiffUn;

const showHideIconsUn = () => {
   let scrollWidthUn = carouselUn.scrollWidth - carouselUn.clientWidth;
   
   arrowIconsUn[0].style.opacity = carouselUn.scrollLeft === 0 ? "0" : "1";
   arrowIconsUn[1].style.opacity = carouselUn.scrollLeft === scrollWidthUn ? "0" : "1";
}

arrowIconsUn.forEach(icon => {
   icon.addEventListener('click', () => {
      let firstDivWidthUn = firstDivUn.clientWidth + 170;
      carouselUn.scrollLeft += icon.id === 'unity-left' ? -firstDivWidthUn : firstDivWidthUn;
      setTimeout(() => showHideIconsUn(), 60);
   })
})

const autoSlideUn = () => {
   if (carouselUn.scrollLeft == (carouselUn.scrollWidth - carouselUn.clientWidth)) return;

   positionDiffUn = Math.abs(positionDiffUn);
   let firstDivWidthUn = firstDivUn.clientWidth + 170;
   let valDiffrenceHB = firstDivWidthUn - positionDiffUn;

   if (carouselUn.scrollLeft > prevScrollLeftUn) {
      return carouselUn.scrollLeft += positionDiffUn > firstDivWidthUn / 3 ? valDiffrenceHB : -positionDiffUn;
   }

   carouselUn.scrollLeft -= positionDiffUn > firstDivWidthUn / 3 ? valDiffrenceHB : -positionDiffUn;
}

const startDragUn = (e) => {
   isDragStartUn = true;
   prevPageXUn = e.pageX || e.touches[0].pageX;
   prevScrollLeftUn = carouselUn.scrollLeft;
}


const draggingUn = (e) => {
   if(!isDragStartUn) return;
   isDraggingUn = true;
   carouselUn.classList.add('draggingUn')
   positionDiffUn = (e.pageX || e.touches[0].pageX) - prevPageXUn;
   carouselUn.scrollLeft = prevScrollLeftUn - positionDiffUn;
   showHideIconsUn()
}


const stopDragUn = () => {
   isDragStartUn = false;
   carouselUn.classList.remove('draggingUn')
   if(!isDraggingUn) return
   isDraggingUn = false;
   autoSlideUn();
}


carouselUn.addEventListener('mousedown', startDragUn)
carouselUn.addEventListener('touchstart', startDragUn)

carouselUn.addEventListener('mousemove', draggingUn)
carouselUn.addEventListener('touchmove', draggingUn)

carouselUn.addEventListener('mouseup', stopDragUn)
carouselUn.addEventListener('touchend', stopDragUn)
