// =========================================================
// WEDDING INVITATION
// Menna & Amr
// MAIN JAVASCRIPT
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const openingScreen = document.getElementById("openingScreen");
const lightButton = document.getElementById("lightButton");
const invitation = document.getElementById("invitation");

const musicButton = document.getElementById("musicButton");
const weddingMusic = document.getElementById("weddingMusic");

const navbar = document.getElementById("navbar");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

const rsvpForm = document.getElementById("rsvpForm");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");


// =========================================================
// PREVENT SCROLL WHILE OPENING SCREEN IS ACTIVE
// =========================================================

document.body.classList.add("lock-scroll");


// =========================================================
// LIGHT THE CANDLE + START MUSIC
// =========================================================

let candleAlreadyLit = false;

if (lightButton) {

    lightButton.addEventListener("click", function () {

        if (candleAlreadyLit) return;

        candleAlreadyLit = true;


        // =============================================
        // START MUSIC IMMEDIATELY
        // =============================================

        if (weddingMusic) {

            weddingMusic.volume = 0.35;

            const musicPromise = weddingMusic.play();

            if (musicPromise !== undefined) {

                musicPromise
                    .then(function () {

                        if (musicButton) {
                            musicButton.classList.add("playing");
                        }

                    })
                    .catch(function (error) {

                        console.log("Music could not be played:", error);

                    });

            }

        }


        // =============================================
        // LIGHT CANDLE
        // =============================================

        openingScreen.classList.add("candle-lit");


        // =============================================
        // CINEMATIC BURST
        // =============================================

        setTimeout(function () {

            openingScreen.classList.add("burst");

        }, 900);


        // =============================================
        // REVEAL INVITATION
        // =============================================

        setTimeout(function () {

            invitation.classList.add("visible");

            openingScreen.classList.add("hidden");

            document.body.classList.remove("lock-scroll");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 2200);

    });

}


// =========================================================
// MUSIC BUTTON
// =========================================================

if (musicButton && weddingMusic) {

    musicButton.addEventListener("click", function () {

        if (weddingMusic.paused) {

            weddingMusic.volume = 0.35;

            weddingMusic
                .play()
                .then(function () {

                    musicButton.classList.add("playing");

                })
                .catch(function (error) {

                    console.log("Music could not be played:", error);

                });

        } else {

            weddingMusic.pause();

            musicButton.classList.remove("playing");

        }

    });

}


// =========================================================
// NAVBAR ON SCROLL
// =========================================================

window.addEventListener("scroll", function () {

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// =========================================================
// MOBILE MENU
// =========================================================

if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener("click", function () {

        mobileMenu.classList.toggle("open");

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("open");

        });

    });

}


// =========================================================
// COUNTDOWN
// =========================================================

const weddingDate =
    new Date("September 13, 2026 19:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


// =========================================================
// ACTIVE NAVIGATION LINK
// =========================================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


// =========================================================
// SMOOTH SCROLL
// =========================================================

const allAnchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


allAnchorLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );

});


// =========================================================
// GALLERY LIGHTBOX
// =========================================================

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


galleryItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const image =
                item.querySelector("img");


            if (!image) return;


            if (!lightbox || !lightboxImage) {
                return;
            }


            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;


            lightbox.classList.add("open");

            document.body.classList.add(
                "lock-scroll"
            );

        }
    );

});


// =========================================================
// CLOSE LIGHTBOX
// =========================================================

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    document.body.classList.remove(
        "lock-scroll"
    );

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


// =========================================================
// CLOSE LIGHTBOX WITH ESCAPE
// =========================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        if (
            lightbox &&
            lightbox.classList.contains("open")
        ) {

            closeLightbox();

        }

    }
);


// =========================================================
// RSVP FORM
// =========================================================

if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();


            const guestCount =
                document
                    .getElementById("guestCount")
                    .value;


            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            if (!guestName) {

                alert(
                    "Please enter your name"
                );

                return;

            }


            if (!guestCount) {

                alert(
                    "Please select the number of guests"
                );

                return;

            }


            if (!attendance) {

                alert(
                    "Please choose your attendance"
                );

                return;

            }


            if (attendance.value === "yes") {

                alert(
                    "Thank you, " +
                    guestName +
                    ". We can't wait to celebrate with you."
                );

            } else {

                alert(
                    "Thank you for letting us know, " +
                    guestName +
                    "."
                );

            }


            rsvpForm.reset();

        }
    );

}


// =========================================================
// IMAGE LOADING
// =========================================================

const allImages =
    document.querySelectorAll("img");


allImages.forEach(function (image) {

    image.addEventListener(
        "load",
        function () {

            image.classList.add("loaded");

        }
    );

});


// =========================================================
// DISABLE RIGHT CLICK ON IMAGES
// =========================================================

allImages.forEach(function (image) {

    image.addEventListener(
        "contextmenu",
        function (event) {

            event.preventDefault();

        }
    );

});


// =========================================================
// PAGE LOAD
// =========================================================

window.addEventListener(
    "load",
    function () {

        updateActiveNav();

    }
);