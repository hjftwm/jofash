$(document).ready(function () {
	getDistanceAndPressure();
	$(window).scroll(function () {
		getDistanceAndPressure();
	});
});

function depthToPressure(depth) {
	const gravity = 9.81; // Acceleration due to gravity in m/s^2
	const density = 1025; // Average density of seawater in kg/m^3
	const atmosphericPressure = 101325; // Atmospheric pressure at sea level in Pascals

	let pressure = (density * gravity * depth + atmosphericPressure) / 100000;

	return pressure;
}

function getDistanceAndPressure() {
	var imageTop = $("#image").offset().top;
	var scrollPosition = $(window).scrollTop();
	var distance = scrollPosition - imageTop;

	distance = Math.max(0, Math.round(distance, 11000));

	$("#distance").text("Depth: " + distance + " m");

	var newPosition = imageTop + distance - scrollPosition;

	$("#distance").css("top", newPosition + "px");

	let pressure = depthToPressure(distance);
	$("#pressure").text("Pressure: " + Math.round(pressure) + " Bars");
}

$("#showAll").on("click", function () {
	$(".species").addClass("active");
	$(".elements").hide();
	$(".showAll").hide();
	$(".hideAll").show();
});

$("#hideAll").on("click", function () {
	$(".species").removeClass("active");
	$(".elements").show();
	$(".showAll").show();
	$(".hideAll").hide();
});

document.addEventListener("DOMContentLoaded", function () {
	const titlesElements = document.querySelectorAll(".titles");

	// Create an intersection titlesobserver
	let titlesobserver = new IntersectionObserver(
		(entries, titlesobserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
					// Stop observing the element once it becomes visible
					titlesobserver.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.1 // Trigger when 10% of the element is visible
		}
	);

	// Observe each .titles element
	titlesElements.forEach((titles) => {
		titlesobserver.observe(titles);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	var speciesElements = document.querySelectorAll(".species");
	var elementsNumber = document.getElementById("elementsNumber");
	var speciesCount = 0;

	function updateSpeciesCount() {
		speciesCount = document.querySelectorAll(".species.visible").length;
		document.getElementById("elementsNumber").textContent = speciesCount;
	}

	speciesElements.forEach(function (element) {
		element.addEventListener("mouseenter", function () {
			if (!element.classList.contains("visible")) {
				element.classList.add("visible");
				updateSpeciesCount();
			}
		});
	});

	// Function to check if an element is in the viewport
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}
});
