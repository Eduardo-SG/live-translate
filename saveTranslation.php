<?php

$inputText = isset($_POST['input-text']) ? $_POST['input-text'] : '';
$outputText = isset($_POST['output-text']) ? $_POST['output-text'] : '';

try {
    $conexion = new PDO("mysql:host=localhost;port=3306;dbname=live-translate", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $pdo = $conexion->prepare('INSERT INTO translation_history(inputText, outputText, TranslationDate) VALUES(?, ?, now())');
    $pdo->bindParam(1, $inputText);
    $pdo->bindParam(2, $outputText);
    $pdo->execute() or die(print($pdo->errorInfo()));

    echo json_encode('true');
} catch (PDOException $error) {
    echo $error->getMessage();
    die();
}
