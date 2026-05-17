// =========================
// AOS INIT
// =========================

AOS.init({
  duration: 1000,
  once: true
});


// =========================
// DOM LOADED
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MODAL ELEMENTS
  // =========================

  const modal = document.getElementById("consultationModal");

  const openBtn = document.getElementById("openModalBtn");

  const closeBtn = document.getElementById("closeModalBtn");

  const form = document.getElementById("consultationForm");

  const submitBtn = form.querySelector("button");

  

  // =========================
  // EMAILJS INIT
  // =========================

  emailjs.init("qg4SULmg5NFfwIt-F");


  // =========================
  // OPEN MODAL
  // =========================

  openBtn.addEventListener("click", () => {

    modal.classList.add("active");
  });


  // =========================
  // CLOSE MODAL FUNCTION
  // =========================

  const closeModal = () => {

    modal.classList.remove("active");

    form.reset(); // RESET FORM
  };


  // =========================
  // CLOSE BUTTON
  // =========================

  closeBtn.addEventListener("click", closeModal);


  // =========================
  // CLOSE ON OUTSIDE CLICK
  // =========================

  window.addEventListener("click", (e) => {

    if(e.target === modal){

      closeModal();
    }
  });


  // =========================
  // FORM SUBMIT
  // =========================

  form.addEventListener("submit", function(e){

    e.preventDefault();


    // =========================
    // GET VALUES
    // =========================

    const name = document.getElementById("name").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const email = document.getElementById("email").value.trim();

    const query = document.getElementById("query").value.trim();


    // =========================
    // VALIDATION
    // =========================

    if(name === ""){

      alert("Please enter your name.");

      return;
    }

    if(mobile === ""){

      alert("Please enter mobile number.");

      return;
    }


    // Mobile validation

    const mobileRegex = /^[0-9]{10}$/;

    if(!mobileRegex.test(mobile)){

      alert("Please enter valid 10 digit mobile number.");

      return;
    }


    // =========================
    // BUTTON LOADING
    // =========================

    submitBtn.disabled = true;

    submitBtn.innerHTML = "Submitting...";


    // =========================
    // EMAILJS SEND
    // =========================

    emailjs.send(
      "service_jf4bluf",
      "template_qp5euko",
      {
        name: name,
        mobile: mobile,
        email: email || "Not Provided",
        query: query || "No Query Added"
      }
    )

    .then(() => {

      alert("Consultation request submitted successfully!");

      form.reset();

      modal.classList.remove("active");
    })

    .catch((error) => {

      console.log("EMAIL ERROR:", error);

      alert("Something went wrong. Please try again.");
    })

    .finally(() => {

      submitBtn.disabled = false;

      submitBtn.innerHTML = "Submit";
    });

  });


  // =========================
  // COUNTER ANIMATION
  // =========================

  const counters = document.querySelectorAll(".counter");

  const speed = 200;

  const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        const counter = entry.target;

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const updateCounter = () => {

          const increment = target / speed;

          if(count < target){

            count += increment;

            counter.innerText = Math.ceil(count);

            requestAnimationFrame(updateCounter);

          } else {

            if(target === 90){

              counter.innerText = target + "%";

            } else {

              counter.innerText = target + "+";
            }
          }
        };

        updateCounter();

        counterObserver.unobserve(counter);
      }
    });

  },{
    threshold:0.5
  });


  counters.forEach(counter => {

    counterObserver.observe(counter);
  });

});