
// ============================================
// UBUNTU COMMUNITY FOOD CENTRE
// EXTERNAL JAVASCRIPT
// ============================================

// Use the same receiving email address as the Contact Us form.
const FORM_SUBMIT_EMAIL = "mudauwavhudi13@gmail.com";


// ============================================
// 1. ENQUIRY FORM - EMAIL SUBMISSION
// ============================================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const response = document.getElementById("response");
        const submitButton = enquiryForm.querySelector('button[type="submit"]');

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        response.textContent = "Sending your enquiry...";
        submitButton.disabled = true;

        try {
            const formData = new FormData(enquiryForm);

            formData.append(
                "_subject",
                "New Enquiry - Ubuntu Community Food Centre"
            );

            const result = await fetch(
                "https://formsubmit.co/ajax/" +
                encodeURIComponent(FORM_SUBMIT_EMAIL),
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const data = await result.json();

            if (result.ok && data.success) {
                response.textContent =
                    "Thank you! Your enquiry has been submitted successfully. We will review your message.";

                enquiryForm.reset();
            } else {
                response.textContent =
                    "Sorry, your enquiry could not be sent. Please try again.";
            }

        } catch (error) {
            response.textContent =
                "A connection error occurred. Please check your internet connection and try again.";

        } finally {
            submitButton.disabled = false;
        }
    });
}


// ============================================
// 2. CONTACT FORM - EMAIL SUBMISSION
// ============================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const response = document.getElementById("contactResponse");
        const submitButton = contactForm.querySelector('button[type="submit"]');

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        response.textContent = "Sending your message...";
        submitButton.disabled = true;

        try {
            const formData = new FormData(contactForm);

            formData.append(
                "_subject",
                "New Contact Message - Ubuntu Community Food Centre"
            );

            const result = await fetch(
                "https://formsubmit.co/ajax/" +
                encodeURIComponent(FORM_SUBMIT_EMAIL),
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const data = await result.json();

            if (result.ok && data.success) {
                response.textContent =
                    "Thank you! Your message has been sent successfully.";

                contactForm.reset();
            } else {
                response.textContent =
                    "Sorry, your message could not be sent. Please try again.";
            }

        } catch (error) {
            response.textContent =
                "A connection error occurred. Please check your internet connection and try again.";

        } finally {
            submitButton.disabled = false;
        }
    });
}


// ============================================
// 3. SERVICES SEARCH AND FILTER
// ============================================

const serviceSearch = document.getElementById("serviceSearch");
const searchButton = document.getElementById("searchButton");
const clearSearch = document.getElementById("clearSearch");
const searchMessage = document.getElementById("searchMessage");
const noResults = document.getElementById("noResults");

if (serviceSearch && searchButton && clearSearch) {

    function filterServices() {
        const searchTerm = serviceSearch.value.toLowerCase().trim();

        const services = document.querySelectorAll(
            "#serviceList .service-card, #serviceList .service-item"
        );

        let found = 0;

        services.forEach(function (service) {
            const serviceText = service.textContent.toLowerCase();
            const matches = serviceText.includes(searchTerm);

            service.hidden = !matches;

            if (matches) {
                found++;
            }
        });

        if (searchMessage) {
            searchMessage.textContent =
                found + " service(s) found.";
        }

        if (noResults) {
            noResults.hidden = found !== 0;
        }
    }

    searchButton.addEventListener("click", filterServices);

    serviceSearch.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            filterServices();
        }
    });

    clearSearch.addEventListener("click", function () {
        serviceSearch.value = "";

        const services = document.querySelectorAll(
            "#serviceList .service-card, #serviceList .service-item"
        );

        services.forEach(function (service) {
            service.hidden = false;
        });

        if (searchMessage) {
            searchMessage.textContent =
                services.length + " service(s) found.";
        }

        if (noResults) {
            noResults.hidden = true;
        }
    });
}


// ============================================
// 4. GALLERY LIGHTBOX
// ============================================

const galleryImages = document.querySelectorAll(".gallery-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

if (galleryImages.length > 0 && lightbox && lightboxImage) {

    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener("click", function () {
            lightbox.hidden = true;
            lightboxImage.src = "";
        });
    }

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.hidden = true;
            lightboxImage.src = "";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.hidden = true;
            lightboxImage.src = "";
        }
    });
}


// ============================================
// 5. INTERACTIVE LEAFLET MAP
// ============================================

const mapElement = document.getElementById("map");

if (mapElement && typeof L !== "undefined") {

    const centreLatitude = -25.99860148;
    const centreLongitude = 28.21119333;

    const map = L.map("map").setView(
        [centreLatitude, centreLongitude],
        15
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ).addTo(map);

    L.marker([centreLatitude, centreLongitude])
        .addTo(map)
        .bindPopup(
            "<b>Ubuntu Community Food Centre</b><br>" +
            "1496 Merca Street, Extension 5, Leboeng, Tembisa"
        )
        .openPopup();
}
