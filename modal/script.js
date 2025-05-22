document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const nextButtons = document.querySelectorAll("#next-modal");
  const prevButtons = document.querySelectorAll("#prev-modal");
  const closeButtons = document.querySelectorAll(".close-modal");
  let currentModalIndex = 0;

  // Function to show a specific modal
  function showModal(index) {
    // Hide all modals
    modals.forEach((modal) => modal.classList.remove("active"));

    // Show the selected modal
    modals[index].classList.add("active");

    // Update button states
    updateButtonStates(index);
  }

  // Function to update button states
  function updateButtonStates(index) {
    // Update prev buttons
    prevButtons.forEach((button) => {
      button.disabled = index === 0;
    });

    // Update next buttons
    nextButtons.forEach((button) => {
      button.disabled = index === modals.length - 1;
    });
  }

  // Initialize the first modal
  showModal(currentModalIndex);

  // Add click event listeners to next buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentModalIndex < modals.length - 1) {
        currentModalIndex++;
        showModal(currentModalIndex);
      }
    });
  });

  // Add click event listeners to prev buttons
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentModalIndex > 0) {
        currentModalIndex--;
        showModal(currentModalIndex);
      }
    });
  });

  // Add click event listeners to close buttons
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modals.forEach((modal) => modal.classList.remove("active"));
    });
  });

  // Handle thumbnail clicks
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Remove active class from all thumbnails in the current modal
      const currentModal = thumbnail.closest(".modal");
      currentModal.querySelectorAll(".thumbnail").forEach((thumb) => {
        thumb.classList.remove("active");
      });

      // Add active class to clicked thumbnail
      thumbnail.classList.add("active");

      // Update main image
      const mainImage = currentModal.querySelector(".main-image");
      mainImage.src = thumbnail.src;
    });
  });

  // Handle navigation arrows
  const prevArrows = document.querySelectorAll(".prev-image");
  const nextArrows = document.querySelectorAll(".next-image");

  prevArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const currentModal = arrow.closest(".modal");
      const thumbnails = currentModal.querySelectorAll(".thumbnail");
      const activeIndex = Array.from(thumbnails).findIndex((thumb) =>
        thumb.classList.contains("active")
      );

      if (activeIndex > 0) {
        thumbnails[activeIndex].classList.remove("active");
        thumbnails[activeIndex - 1].classList.add("active");
        currentModal.querySelector(".main-image").src =
          thumbnails[activeIndex - 1].src;
      }
    });
  });

  nextArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const currentModal = arrow.closest(".modal");
      const thumbnails = currentModal.querySelectorAll(".thumbnail");
      const activeIndex = Array.from(thumbnails).findIndex((thumb) =>
        thumb.classList.contains("active")
      );

      if (activeIndex < thumbnails.length - 1) {
        thumbnails[activeIndex].classList.remove("active");
        thumbnails[activeIndex + 1].classList.add("active");
        currentModal.querySelector(".main-image").src =
          thumbnails[activeIndex + 1].src;
      }
    });
  });
});
