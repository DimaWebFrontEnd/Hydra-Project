const carouselHB = document.querySelector('.header-bottom');
const firstDivHB = carouselHB.querySelectorAll('.carousel-div')[0];
const arrowIconsHB = document.querySelectorAll('.header-bottom-container i')

let isDragStartHB = false;
let isDraggingHB = false;
let prevPageXHB;
let prevScrollLeftHB;
let positionDiffHB;

const showHideIconsHB = () => {
   let scrollWidthHB = carouselHB.scrollWidth - carouselHB.clientWidth;
   
   arrowIconsHB[0].style.opacity = carouselHB.scrollLeft === 0 ? "0" : "1";
   arrowIconsHB[1].style.opacity = carouselHB.scrollLeft === scrollWidthHB ? "0" : "1";
}

arrowIconsHB.forEach(icon => {
   icon.addEventListener('click', () => {
      let firstDivWidth = firstDivHB.clientWidth + 30;
      carouselHB.scrollLeft += icon.id === 'header-left' ? -firstDivWidth : firstDivWidth;
      setTimeout(() => showHideIconsHB(), 60);
   })
})

const autoSlideHB = () => {
   if (carouselHB.scrollLeft == (carouselHB.scrollWidth - carouselHB.clientWidth)) return;

   positionDiffHB = Math.abs(positionDiffHB);
   let firstDivWidthHB = firstDivHB.clientWidth + 30;
   let valDiffrenceHB = firstDivWidthHB - positionDiffHB;

   if (carouselHB.scrollLeft > prevScrollLeftHB) {
      return carouselHB.scrollLeft += positionDiffHB > firstDivWidthHB / 3 ? valDiffrenceHB : -positionDiffHB;
   }

   carouselHB.scrollLeft -= positionDiffHB > firstDivWidthHB / 3 ? valDiffrenceHB : -positionDiffHB;
}

const startDragHB = (e) => {
   isDragStartHB = true;
   prevPageXHB = e.pageX || e.touches[0].pageX;
   prevScrollLeftHB = carouselHB.scrollLeft;
}


const draggingHB = (e) => {
   if(!isDragStartHB) return;
   isDraggingHB = true;
   carouselHB.classList.add('draggingHB')
   positionDiffHB = (e.pageX || e.touches[0].pageX) - prevPageXHB;
   carouselHB.scrollLeft = prevScrollLeftHB - positionDiffHB;
   showHideIconsHB()
}


const stopDragHB = () => {
   isDragStartHB = false;
   carouselHB.classList.remove('draggingHB')
   if(!isDraggingHB) return
   isDraggingHB = false;
   autoSlideHB();
}


carouselHB.addEventListener('mousedown', startDragHB)
carouselHB.addEventListener('touchstart', startDragHB)

carouselHB.addEventListener('mousemove', draggingHB)
carouselHB.addEventListener('touchmove', draggingHB)

carouselHB.addEventListener('mouseup', stopDragHB)
carouselHB.addEventListener('touchend', stopDragHB)
