const favicons = require("favicons");
const source = "web-app-manifest-512x512.png"; // Twoje źródłowe logo

const configuration = {
  path: "/favicon/", // Ścieżka, pod którą ikony będą dostępne (relative to domain root)
  appName: "Kryształy Kingi",
  appShortName: "Kryształy",
  appDescription: "Dowody na wymuszanie przewozu narkotyków i próby tuszowania sprawy.",
  developerName: "Kinga",
  developerURL: null, // Możesz podać URL developera
  background: "#f9f9f9",
  theme_color: "#00bcd4",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,      // Ikony Android
    appleIcon: true,    // Ikony Apple Touch
    appleStartup: true, // Ikony Apple Startup
    coast: false,
    favicons: true,     // Klasyczny favicon.ico
    firefox: true,
    windows: true,      // Ikony Microsoft Tiles
    yandex: false
  }
};

favicons(source, configuration, (error, response) => {
  if (error) {
    console.error("Błąd generowania favicon:", error.message);
    return;
  }

  // Wyświetlenie informacji o wygenerowanych plikach
  console.log("Wygenerowane obrazy:");
  response.images.forEach(img => console.log(img.name));
  
  console.log("\nWygenerowane pliki:");
  response.files.forEach(file => console.log(file.name));
  
  console.log("\nWklej poniższy kod HTML do sekcji <head> swojej strony:");
  response.html.forEach(line => console.log(line));
});
