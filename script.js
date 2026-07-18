// ===========================
// PASSWORD
// ===========================

const PASSWORD = "071926";

const music = document.getElementById("birthdayMusic");
const otpInputs = document.querySelectorAll(".otp-input");
const button = document.getElementById("unlockBtn");
const error = document.getElementById("error");

// ===========================
// OTP INPUT BEHAVIOR
// ===========================

otpInputs[0].focus();

otpInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        // Numbers only
        input.value = input.value.replace(/\D/g, "");

        // Move to next box
        if (input.value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }

        // Last box -> auto check
        if (
            index === otpInputs.length - 1 &&
            input.value &&
            [...otpInputs].every(box => box.value !== "")
        ) {
            checkPassword();
        }

    });

    input.addEventListener("keydown", e => {

        // Move backwards
        if (e.key === "Backspace") {
            if (!input.value && index > 0) {
                otpInputs[index - 1].focus();

            } else {
                input.value = "";

            }

        }

        // Press Enter
        if (e.key === "Enter") {
            checkPassword();
        }

    });

    // Allow pasting the whole code
    input.addEventListener("paste", e => {

        e.preventDefault();

        const paste = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, otpInputs.length);

        paste.split("").forEach((char, i) => {
            otpInputs[i].value = char;
        });

        if (paste.length === otpInputs.length) {
            checkPassword();
        } else {
            otpInputs[paste.length]?.focus();
        }

    });

});

// Allow browser to start music after the user's first click
document.body.addEventListener("click", function () {

    music.volume = 0.4;

    music.play().catch(err => {
        console.log("Music couldn't start:", err);
    });

}, { once: true });

// Unlock Button
button.addEventListener("click", checkPassword);

function checkPassword() {

    const entered = [...otpInputs]
        .map(box => box.value)
        .join("");

    if (entered === PASSWORD) {

        error.textContent = "";

        music.volume = 0.4;

        music.play().catch(err => console.log(err));

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("birthdayPage").style.display = "block";

        document.body.style.overflowY = "auto";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        error.textContent = "❌ Wrong Passcode";

        otpInputs.forEach(box => box.value = "");

        otpInputs[0].focus();

    }

}
// ===========================
// FLOATING HEARTS
// ===========================

const hearts = document.getElementById("hearts");

setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML = ["❤️","💖","💕","💗"][Math.floor(Math.random() * 4)];
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}, 250);

clickMessage.addEventListener("click", () => {

    clickMessage.style.display = "none";
    loveLetter.style.display = "block";
    startTyping();

});

const messages = [
    {
        id: "title",
        text: "HAPPY US DAY, MY LOVE ♡"
    },
    {
        id: "line1",
        text: "Happy Monthsary to us, love ko! Thank you palagi for being my partner in crime, my best friend, and the love of my life. I am so grateful for every moment we share together."
    },
    {
        id: "line2",
        text: "Sana hinde ka magsawa sakin HAHAHAHA love kita sobra bebe. sorry ha kung minsan nakakainis ako HAHAHAHA. and madalas kitang inaasar. but I promise to always love you and make you happy."
    },
    {
        id: "line3",
        text: "Kung madalas man tayo nag aaway sana di mo isipin na nakakasawa yung rs na meron tayo. Sana mas isipin mo na kaya tayo nag aaway kasi para ayusin or itama yung mga nakikita nating mali para hinde na lumaki."
    },
    {
        id: "line4",
        text: "Nag code ako kasi HAHA wala na akong materials talaga pang craft eh. kaya bawi muna ako sa virtual HAHAHAHA. sana hinde mo isipin na chill ako or what ik kasi sometimes naiisip mo yun eh. pero minsan kasi wala lang talaga ako marami ako naiisip minsan kinakapos lang. Ang wish ko is same parin sa winiwish ko palagi HAHAHA ikyk. Happy Monthsary Ulit baby! i love you so much and Good luck palagi sa mga ginagawa mo and sa mga sasalihan mong clubs proud ako sayo palagi."
    },
    {       
        id: "ending",
        text: "Happy Us Day, Bebe ♡"
    }
];

function typeText(element, text, speed = 35) {

    return new Promise(resolve => {

        let i = 0;

        function typing() {

            if (i < text.length) {

                element.innerHTML += text.charAt(i);

                i++;

                setTimeout(typing, speed);

            } else {

                resolve();

            }

        }

        typing();

    });

}

async function startTyping() {

    for (const msg of messages) {
        const element = document.getElementById(msg.id);
        element.innerHTML = "";
        await typeText(element, msg.text, 35);
        await new Promise(r => setTimeout(r, 600));

    }

}

// Focus first box when page loads
otpInputs[0].focus();
otpInputs.forEach((input, index) => {

    // Move to next input after typing
    input.addEventListener("input", (e) => {

        // Allow only one number
        input.value = input.value.replace(/\D/g, "");
        if (input.value.length === 1) {
            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            } else {
                input.blur();

                // Automatically check when all boxes are filled
                checkPassword();
            }
        }

    });

    // Backspace moves to previous box
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
            if (input.value === "" && index > 0) {
                otpInputs[index - 1].focus();

            } else {
                input.value = "";
            }

        }

        // Press Enter
        if (e.key === "Enter") {
            checkPassword();
        }

    });

    // Paste full OTP
    input.addEventListener("paste", (e) => {

        e.preventDefault();

        const paste = (e.clipboardData || window.clipboardData)
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, otpInputs.length);

        paste.split("").forEach((char, i) => {
            otpInputs[i].value = char;
        });

        if (paste.length === otpInputs.length) {
            checkPassword();const otpInputs = document.querySelectorAll(".otp-input");
        } else {
            otpInputs[paste.length]?.focus();
        }

    });

});