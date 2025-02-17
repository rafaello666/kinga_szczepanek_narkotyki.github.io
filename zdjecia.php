<?php
// Ustawienia
$allowed_extensions = array('jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp');

// Pobierz aktualny katalog
$directory = __DIR__;

// Pobierz adres URL aktualnego katalogu
// Zakładamy, że serwer obsługuje zmienną $_SERVER['HTTP_HOST'] i odpowiedni protokół
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || 
            $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$base_url = $protocol . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . '/';

// Otwórz katalog
if ($handle = opendir($directory)) {
    echo '<!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <title>Galeria Obrazów</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .gallery { display: flex; flex-wrap: wrap; }
            .gallery-item { margin: 10px; text-align: center; }
            .gallery-item img { max-width: 200px; height: auto; display: block; margin-bottom: 5px; }
            .gallery-item a { word-wrap: break-word; }
        </style>
    </head>
    <body>
        <h1>Galeria Obrazów</h1>
        <div class="gallery">';
    
    // Iteruj przez pliki w katalogu
    while (false !== ($file = readdir($handle))) {
        // Pomijaj katalogi '.' i '..'
        if ($file === '.' || $file === '..') {
            continue;
        }

        // Pobierz rozszerzenie pliku
        $file_extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        // Sprawdź, czy plik jest obrazem
        if (in_array($file_extension, $allowed_extensions)) {
            // Bezpieczne kodowanie nazwy pliku do URL
            $file_url = htmlspecialchars($base_url . rawurlencode($file));

            echo '<div class="gallery-item">
                    <img src="' . $file_url . '" alt="' . htmlspecialchars($file) . '">
                    <a href="' . $file_url . '" target="_blank">' . htmlspecialchars($file_url) . '</a>
                  </div>';
        }
    }

    echo '</div>
    </body>
    </html>';

    closedir($handle);
} else {
    echo "Nie można otworzyć katalogu.";
}
?>
