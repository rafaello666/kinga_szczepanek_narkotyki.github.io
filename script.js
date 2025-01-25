// script.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Ostrzeżenie 18+
  const ageWarning = document.getElementById("ageWarning");
  const confirmAgeBtn = document.getElementById("confirmAge");
  const leaveSiteBtn = document.getElementById("leaveSite");

  // Jeśli w localStorage jest informacja, że użytkownik potwierdził 18 lat:
  if (localStorage.getItem("adultConfirmed") === "true") {
    ageWarning.style.display = "none";
  }

  if (confirmAgeBtn) {
    confirmAgeBtn.addEventListener("click", () => {
      ageWarning.style.display = "none";
      localStorage.setItem("adultConfirmed", "true");
    });
  }
  if (leaveSiteBtn) {
    leaveSiteBtn.addEventListener("click", () => {
      window.location.href = "https://www.google.com/";
    });
  }

  // 2. Hamburger
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("toggle");
    });
  }

  // Zamknięcie menu po kliknięciu w link
  const navLinksItems = navLinks.querySelectorAll("a");
  navLinksItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("toggle");
    });
  });

  // 3. CHAT – Socket.IO
  let socket;
  try {
    // Próba połączenia z serwerem
    socket = io();
  } catch (err) {
    console.warn("Socket.IO nie jest dostępne. Chat w trybie offline.");
  }

  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");

  // Funkcja do wyświetlania wiadomości
  function addMessage(author, text, self = false) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(self ? "message-user" : "message-other");

    const authorSpan = document.createElement("span");
    authorSpan.classList.add("message-author");
    authorSpan.textContent = author + ": ";

    const textSpan = document.createElement("span");
    textSpan.classList.add("message-text");
    textSpan.textContent = text;

    msgDiv.appendChild(authorSpan);
    msgDiv.appendChild(textSpan);

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Logika chatu
  if (socket) {
    socket.on("chat message", (data) => {
      addMessage(data.author, data.message, false);
    });
    socket.on("connect", () => {
      console.log("Połączono z Socket.IO, id:", socket.id);
    });
    socket.on("disconnect", () => {
      console.log("Rozłączono z Socket.IO");
    });
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const messageText = chatInput.value.trim();
      if (!messageText) return;

      // Pokaż u siebie
      addMessage("Ty", messageText, true);

      // Wyślij do serwera
      if (socket) {
        socket.emit("chat message", {
          author: "Ty",
          message: messageText
        });
      }

      chatInput.value = "";
    });
  }

  // 4. PDF.js – Funkcje openPDF i closePDF
  window.openPDF = function(pdfUrl) {
    const pdfModal = document.getElementById("pdfModal");
    const pdfCanvas = document.getElementById("pdfCanvas");
    const ctx = pdfCanvas.getContext("2d");

    pdfModal.style.display = "block";

    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
      // łapiemy pierwszą stronę
      pdf.getPage(1).then(function(page) {
        const viewport = page.getViewport({ scale: 1.5 });
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;

        const renderCtx = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderCtx);
      });
    }).catch(function(error) {
      console.error("Błąd wczytywania PDF:", error);
      alert("Nie można załadować dokumentu PDF.");
      closePDF();
    });
  };

  window.closePDF = function() {
    const pdfModal = document.getElementById("pdfModal");
    pdfModal.style.display = "none";
  };

});
