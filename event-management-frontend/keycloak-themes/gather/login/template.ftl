<#macro registrationLayout displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${msg("loginTitle",(realm.displayName!''))}</title>
  
  <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css">
  
  <script>
    const APP_HOME_URL = 'http://localhost:4200';
  </script>
</head>
<body>
  <#nested>
  
  <script>
    const backLink = document.getElementById('backToHomeLink');
    if (backLink) {
      backLink.href = APP_HOME_URL;
    }
  </script>
</body>
</html>
</#macro>