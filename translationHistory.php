<?php
$conexion = mysqli_connect('localhost', 'root', '', 'live-translate')
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Translate</title>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="https://icons.iconarchive.com/icons/martz90/circle-addon2/512/google-translate-icon.png" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />

</head>

<body>
    <header>
        <div class="container">
            <div class="head-right">
                <a href="index.html">Live Translate</a>
            </div>
        </div>
    </header>
    <main>
        <div class="container wrapper">
            <div class="translate-tab">
                <label onclick="goBack()" for="upload-document" class="upload-document-button">
                    <span class="icon back-icon">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </span>
                    <span class="button-text">
                        <span>Back</span>
                    </span>
                </label>
            </div>
            <div class="translation-box-wrapper">
                <table id="myTable" class="display">
                    <thead>
                        <tr>
                            <th scope="col">Original Text</th>
                            <th scope="col">Translation</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sql = "SELECT * from translation_history";
                        $result = mysqli_query($conexion, $sql);

                        while ($mostrar = mysqli_fetch_array($result)) {
                        ?>
                            <tr>
                                <td><?php echo $mostrar['inputText'] ?></td>
                                <td><?php echo $mostrar['outputText'] ?></td>
                                <td><?php echo $mostrar['TranslationDate'] ?></td>
                            </tr>
                        <?php
                        }
                        ?>
                    </tbody>
                </table>

            </div>
        </div>

    </main>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
    <script src="languages.js"></script>
    <script src="script.js"></script>
    <script>
        $(document).ready(function() {
            $('#myTable').DataTable();
        });
    </script>
</body>

</html>