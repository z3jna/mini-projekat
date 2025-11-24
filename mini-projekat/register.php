<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $techLanguage = $_POST['techLanguage'] ?? '';

    
    if (!$name || !$email || !$password || !$techLanguage) {
        echo "Sva polja su obavezna.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Neispravan format email adrese.";
        exit;
    }

    
    if (!isset($_FILES['profileImage']) || $_FILES['profileImage']['error'] !== UPLOAD_ERR_OK) {
        echo "Morate uploadovati profilnu sliku.";
        exit;
    }

    $imageTmpPath = $_FILES['profileImage']['tmp_name'];
    $imageName = $_FILES['profileImage']['name'];
    $imageSize = $_FILES['profileImage']['size'];
    $imageType = $_FILES['profileImage']['type'];

    $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!in_array($imageType, $allowedTypes)) {
        echo "Dozvoljeni formati su JPG i PNG.";
        exit;
    }


    if ($imageSize > 5 * 1024 * 1024) {
        echo "Slika je prevelika. Maksimalno 5MB.";
        exit;
    }

    $uploadDir = 'uploads/';

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $uniqueImageName = time() . "_" . basename($imageName);
    $destinationPath = $uploadDir . $uniqueImageName;

    if (!move_uploaded_file($imageTmpPath, $destinationPath)) {
        echo "Greška pri uploadu slike.";
        exit;
    }

    
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    
    echo "<h2>Registracija uspešna!</h2>";
    echo "<strong>Ime:</strong> $name<br>";
    echo "<strong>Email:</strong> $email<br>";
    echo "<strong>Tehnički jezik:</strong> $techLanguage<br>";
    echo "<strong>Sačuvana slika:</strong> $destinationPath<br><br>";

    echo "<img src='$destinationPath' width='200' style='border-radius:10px'><br><br>";

    echo "<strong>Hash lozinke:</strong><br>$passwordHash";

} else {
    echo "Neispravan zahtev.";
}
?>
