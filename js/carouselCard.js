const carousel = document.querySelector(".carousel");
const firstDiv = carousel.querySelectorAll(".card")[0];
const arrowIcons = document.querySelectorAll(".carousel__wrap i");

let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

const showHideIcons = () => {
   let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
   
   arrowIcons[0].style.opacity = carousel.scrollLeft === 0 ? "0" : "1";
   arrowIcons[1].style.opacity = carousel.scrollLeft === scrollWidth ? "0" : "1";
}

arrowIcons.forEach(icon => { 
   icon.addEventListener('click', () => {
      let firstDivWidth = firstDiv.clientWidth + 10;
      carousel.scrollLeft += icon.id === "left" ? -firstDivWidth : firstDivWidth;
      setTimeout(() => showHideIcons(), 60);
   })
})

const autoSlide = () => {
   if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

   positionDiff = Math.abs(positionDiff);
   let firstDivWidth = firstDiv.clientWidth + 10;
   let valDiffrence = firstDivWidth - positionDiff;

   if (carousel.scrollLeft > prevScrollLeft) {
      return carousel.scrollLeft += positionDiff > firstDivWidth / 3 ? valDiffrence : -positionDiff;
   }

   carousel.scrollLeft -= positionDiff > firstDivWidth / 3 ? valDiffrence : -positionDiff;
}

const dragStart = (e) => {
   isDragStart = true;
   prevPageX = e.pageX || e.touches[0].pageX;
   prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
   if (!isDragStart) return;
   isDragging = true;
   carousel.classList.add("dragging")
   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

const dragStop = () => {
   isDragStart = false;
   carousel.classList.remove("dragging")
   if (!isDragging) return;
   isDragging = false;
   autoSlide()
}

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchmove", dragging)

carousel.addEventListener("mouseup", dragStop)
carousel.addEventListener("touchend", dragStop)
