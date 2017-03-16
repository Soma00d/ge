<!DOCTYPE html>
<html>
    <head>
        <title>Test Bench User interface</title>
        <link rel="stylesheet" type="text/css" href="css/application.css">
        <script src="lib/jquery-3.1.1.min.js"></script>        
    </head>
    <body>
        <div id="header">
            <?php include('template/header.html'); ?>
        </div>
        
        <div id="main_container">
            <div id="content_role" class="page_content">
                <?php include('template/role.html'); ?>
            </div>
            <div id="content_login" class="page_content">
                <?php include('template/login.html'); ?>
            </div>
            <div id="content_home" class="page_content active">
                <?php include('template/homepage.html'); ?>
            </div>
            <div id="content_hometest" class="page_content">
                <?php include('template/hometest.html'); ?>
            </div>
            <div id="content_pretest" class="page_content">
                <?php include('template/pretest.html'); ?>
            </div>
            <div id="content_calibration" class="page_content">
                <?php include('template/calibration.html'); ?>
            </div>
            <div id="content_print" class="page_content">
                <?php include('template/print.html'); ?>
            </div>
        </div>
        
        <div id="footer">
            <?php include('template/footer.html'); ?>
        </div>
                
        <script src="js/function.js"></script>
        <script src="js/integration.js"></script>
    </body>
</html>