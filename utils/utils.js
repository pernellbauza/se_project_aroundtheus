//export function closeByEscape(evt) {
//console.log("Escape key pressed");
//if (evt.key === "Escape" && currentlyOpenModal) {
//        closeModal(currentlyOpenModal);
//     }
//   };
// open popup and add esc event listener
//export function openModal(modal) {
//  modal.classList.add("modal_opened");
//  currentlyOpenModal = modal;
//  document.addEventListener("keydown", closeByEscape);
//}
// close popup and remove esc event listener
//export function closeModal(modal) {
//  modal.classList.remove("modal_opened");
//  currentlyOpenModal = null;
// document.removeEventListener("keydown", closeByEscape);
//}
//
//modals.forEach((modal) => {
// modal.addEventListener("mousedown", (evt) => {
//   if (evt.target.classList.contains("modal_opened")) {
//     closeModal(evt.currentTarget);
//  }
//   if (evt.target.classList.contains("modal__close")) {
//     closeModal(evt.currentTarget);
//  }
//  });
//});

const modals = document.querySelectorAll(".modal");
let currentlyOpenModal = null;

// close the popup when esc is pressed
export function closeByEscape(evt) {
  //console.log("Escape key pressed");
  if (evt.key === "Escape" && currentlyOpenModal) {
        closeModal(currentlyOpenModal);
      }
    };

// open popup and add esc event listener
export function openModal(modal) {
  modal.classList.add("modal_opened");
  currentlyOpenModal = modal;
  document.addEventListener("keydown", closeByEscape);
}

// close popup and remove esc event listener
export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  currentlyOpenModal = null;
  document.removeEventListener("keydown", closeByEscape);
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.currentTarget);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(evt.currentTarget);
    }
  });
});
