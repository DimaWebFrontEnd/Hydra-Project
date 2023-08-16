const carouselCr = document.querySelector('.circle-carousel');
const firstDivCr = carouselCr.querySelectorAll('div')[0];
const arrowIconsCr = document.querySelectorAll('.circle-wrap i')

let isDragStartCr = false;
let isDraggingCr = false;
let prevPageXCr;
let prevScrollLeftCr;
let positionDiffCr;

const showHideIconsCr = () => {
   let scrollWidthCr = carouselCr.scrollWidth - carouselCr.clientWidth;
   
   arrowIconsCr[0].style.opacity = carouselCr.scrollLeft === 0 ? "0" : "1";
   arrowIconsCr[1].style.opacity = carouselCr.scrollLeft === scrollWidthCr ? "0" : "1";
}

arrowIconsCr.forEach(icon => {
   icon.addEventListener('click', () => {
      let firstDivWidthCr = firstDivCr.clientWidth + 70;
      carouselCr.scrollLeft += icon.id === 'circle-left' ? -firstDivWidthCr : firstDivWidthCr;
      setTimeout(() => showHideIconsCr(), 60);
   })
})

const autoSlideCr = () => {
   if (carouselCr.scrollLeft == (carouselCr.scrollWidth - carouselCr.clientWidth)) return;

   positionDiffCr = Math.abs(positionDiffCr);
   let firstDivWidthCr = firstDivCr.clientWidth + 70;
   let valDiffrenceCr = firstDivWidthCr - positionDiffCr;

   if (carouselCr.scrollLeft > prevScrollLeftCr) {
      return carouselCr.scrollLeft += positionDiffCr > firstDivWidthCr / 3 ? valDiffrenceCr : -positionDiffCr;
   }

   carouselCr.scrollLeft -= positionDiffCr > firstDivWidthCr / 3 ? valDiffrenceCr : -positionDiffCr;
}

const startDragCr = (e) => {
   isDragStartCr = true;
   prevPageXCr = e.pageX || e.touches[0].pageX;
   prevScrollLeftCr = carouselCr.scrollLeft;
}


const draggingCr = (e) => {
   if(!isDragStartCr) return;
   e.preventDefault();
   isDraggingCr = true;
   carouselCr.classList.add('draggingCr')
   positionDiffCr = (e.pageX || e.touches[0].pageX) - prevPageXCr;
   carouselCr.scrollLeft = prevScrollLeftCr - positionDiffCr;
   showHideIconsCr()
}


const stopDragCr = () => {
   isDragStartCr = false;
   carouselCr.classList.remove('draggingCr')
   if(!isDraggingCr) return
   isDraggingCr = false;
   autoSlideCr();
}


carouselCr.addEventListener('mousedown', startDragCr)
carouselCr.addEventListener('touchstart', startDragCr)

carouselCr.addEventListener('mousemove', draggingCr)
carouselCr.addEventListener('touchmove', draggingCr)

carouselCr.addEventListener('mouseup', stopDragCr)
carouselCr.addEventListener('touchend', stopDragCr)
