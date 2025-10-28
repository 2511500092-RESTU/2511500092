document.getElementById("menuToggle").addEventListener("click", function () {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        this.textContent = "\u2716";
    } else {
        this.textContent = "\u2630";
    }
});

document.querySelector("form").addEventListener("submit", function (e) {
    const nama = document.getElementById("txtNama");
    const email = document.getElementById("txtEmail");
    const pesan = document.getElementById("txtPesan");

    document.querySelectorAll(".error-msg").forEach(el => el.remove());
    [nama, email, pesan].forEach(el => el.style.border = "");

    let isValid = true;

    if (nama.value.trim().length < 3) {
      showError(nama, "Nama minimal 3 huruf dan tidak boleh kosong.");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(nama.value)) {
      showError(nama, "Nama hanya boleh berisi huruf dan spasi.");
      isValid = false;
    }

    if (email.value.trim() == "") {
        showError(email, "email wajib di isi.");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+$/.test(email.value)) {
        showError(email, "Format email tidal valid. Contoh: nama@gmail.com");
        isValid = false;
    }

    if (pesan.value.trim().length < 10) {
        showError(pesan, "Pesan minimal 10 karakter agar lebih jelas.");
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    } else {
        alert("Terima kasih, " + nama.value + "!\nPesan anda telah dikirim.");
    }
});

function showError(inputElement, massage) {
    const label = inputElement.closest("label");
    if (!label) return;   
    
    label.style.flexwrap = "wrap";
    const small = document.createElement('small');
    small.classList = "error-msg";
    small.textContent = "massage";

    small.style.color = "red";
    small.style.fontSize = "14px";
    small.style.display = "flex";
    small.style.marginTop = "4px";
    small.style.flexBasis = "100%";
    small.dataset.forid = inputElement.id;

    if (inputElement.nextSibling) {
        label.inserBefore(small, inputElement.nextSibling);
    } else {
        label.appendChild(small);
    }

    inputElement.style.border = "1px solid red";

    alginErrormessage(small, inputElement);
}

function alginErrormessage(smallEl, inputEl) {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    if (isMobile) {
        smallEl.style.marginleft = "0";
        smallEl.style.width = "100%";
        return;
    }

    const label = inputEl.closest("label");
    if (!label) return;

    const rectlabel = label.getBounddingCelientRect();
    const rectInput = inputEl.getBounddingCelientRect();
    const offsetleft = Math.max(0, Math.round(rectInput.left - rectlabel.left));

    smallEl.style.marginleft = offsetleft + "px";
    smallEl.style.width = Math.round(rectInput.width) + "px";
}

window.addEventListener("resize", () => {
    document.querySelectorAll(".error-msg").forEach(small => {
        const target = document.getElementById(small.dataset.forId);
        if (target) alginErrormessage (small, target);
    });
    });