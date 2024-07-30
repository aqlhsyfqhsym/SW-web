$(document).ready(function () {
  $(".center").slick({
    centerMode: true,
    centerPadding: "140px",
    variableWidth: true,
    pauseOnFocus: true,
    slidesToShow: 3,
    speed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
          variableWidth: true,
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".center .slick-slide").css({
    "margin-left": "-35px",
    "margin-top": "10px",
    "margin-bottom": "10px",
    "margin-right": "-35px",
  });

  $(".center .slick-list").css({
    "margin-left": "2px",
    "margin-top": "10px",
    "margin-bottom": "10px",
    "margin-right": "2px",
  });
});

$(".center.slider").on("afterChange", function (event, slick, currentSlide) {
  $(".content-slider .content").removeClass("active");
  $(".content-slider .content").eq(currentSlide).addClass("active");
});

function downloadPDF() {
  const link = document.createElement("a");
  link.href = "./assets/download/Sunway_Wellesley-Serene-Villas.pdf";
  link.download = "Sunway_Wellesley-Serene-Villas.pdf";

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger the click event of the link
  link.click();

  // Clean up
  document.body.removeChild(link);
}

AOS.init({
  duration: 1000,
});
