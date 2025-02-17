const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Ścieżka do Twojego źródłowego obrazu (najlepiej kwadratowego, wysokiej jakości)
const inputImage = "web-app-manifest-512x512.png";

// Folder docelowy dla ikon – upewnij się, że folder istnieje lub utwórz go
const outputFolder = path.join(__dirname, "favicon");
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Definicje ikon w formacie kwadratowym
const squareIcons = [
  // Favicon PNG
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-96x96.png", size: 96 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-256x256.png", size: 256 },
  { name: "favicon-512x512.png", size: 512 },
  
  // Apple Touch Icons
  { name: "apple-touch-icon-57x57.png", size: 57 },
  { name: "apple-touch-icon-60x60.png", size: 60 },
  { name: "apple-touch-icon-72x72.png", size: 72 },
  { name: "apple-touch-icon-76x76.png", size: 76 },
  { name: "apple-touch-icon-114x114.png", size: 114 },
  { name: "apple-touch-icon-120x120.png", size: 120 },
  { name: "apple-touch-icon-144x144.png", size: 144 },
  { name: "apple-touch-icon-152x152.png", size: 152 },
  { name: "apple-touch-icon-180x180.png", size: 180 },

  // Android / Chrome (część rozmiarów – można powtórzyć te same lub dodać dodatkowe)
  { name: "android-chrome-36x36.png", size: 36 },
  { name: "android-chrome-48x48.png", size: 48 },
  { name: "android-chrome-72x72.png", size: 72 },
  { name: "android-chrome-96x96.png", size: 96 },
  { name: "android-chrome-144x144.png", size: 144 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-256x256.png", size: 256 },
  { name: "android-chrome-384x384.png", size: 384 },
  { name: "android-chrome-512x512.png", size: 512 },

  // Microsoft Tiles (kwadratowe wersje)
  { name: "mstile-70x70.png", size: 70 },
  { name: "mstile-144x144.png", size: 144 },
  { name: "mstile-150x150.png", size: 150 },
  { name: "mstile-310x310.png", size: 310 }
];

// Definicje ikon o niestandardowych proporcjach (prostokątne)
// Przykład: Microsoft wide tile (310x150) – tutaj rozmiary są różne dla szerokości i wysokości
const rectangularIcons = [
  { name: "mstile-310x150.png", width: 310, height: 150 }
];

// Funkcja generująca ikonę kwadratową
function generateSquareIcon(icon) {
  sharp(inputImage)
    .resize(icon.size, icon.size)
    .toFile(path.join(outputFolder, icon.name))
    .then(() => console.log(`Wygenerowano ${icon.name}`))
    .catch(err => console.error(`Błąd przy generowaniu ${icon.name}:`, err));
}

// Funkcja generująca ikonę prostokątną
function generateRectangularIcon(icon) {
  sharp(inputImage)
    .resize(icon.width, icon.height)
    .toFile(path.join(outputFolder, icon.name))
    .then(() => console.log(`Wygenerowano ${icon.name}`))
    .catch(err => console.error(`Błąd przy generowaniu ${icon.name}:`, err));
}

// Generowanie ikon kwadratowych
squareIcons.forEach(icon => generateSquareIcon(icon));

// Generowanie ikon prostokątnych
rectangularIcons.forEach(icon => generateRectangularIcon(icon));
