<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${msg("loginTitle",(realm.displayName!''))}</title>
  <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css">
  <script>
    // Configuration - Modifier ici pour changer l'URL
    const APP_HOME_URL = 'http://localhost:4200';
  </script>
</head>

<body>
  <div class="container">
    <!-- Header -->
    <div class="header">      
      <div class="brand-container">
        <div class="logo-wrapper">
          <div class="logo-glow"></div>
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"></path>
              <path d="M3 10h18"></path>
              <path d="M15 22v-4a2 2 0 0 1 2-2h4"></path>
            </svg>
          </div>
        </div>
        <span class="brand-name">GATHER</span>
      </div>

      <p class="tagline">Where Events Come Together</p>

      <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="divider-line reverse"></div>
      </div>
    </div>

    <!-- Login Card -->
    <div class="card">
      <h2 class="form-title">Sign in to your account</h2>

      <form id="kc-form-login" action="${url.loginAction}" method="post">
        <!-- Error Alert -->
        <#if message?? && message.summary??>
        <div class="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          ${message.summary}
        </div>
        </#if>

        <!-- Email/Username Field -->
        <div class="form-group">
          <label for="username" class="form-label">Email</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-input"
            value="${login.username!''}"
            placeholder="Enter your email"
            autocomplete="username"
            autofocus
          />
          <#if messagesPerField?? && messagesPerField.existsError('username')>
          <div class="error-message">${messagesPerField.get('username')}</div>
          </#if>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-input"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
          <#if messagesPerField?? && messagesPerField.existsError('password')>
          <div class="error-message">${messagesPerField.get('password')}</div>
          </#if>
        </div>

        <!-- Remember Me + Forgot Password -->
        <div class="form-options">
          <#if realm.rememberMe>
          <label class="checkbox-label">
            <input type="checkbox" name="rememberMe" id="rememberMe" <#if login.rememberMe??>checked</#if> />
            <span>Remember me</span>
          </label>
          <#else>
          <span></span>
          </#if>
          <#if realm.resetPasswordAllowed>
          <a href="${url.loginResetCredentialsUrl}" class="forgot-link">Forgot password?</a>
          </#if>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit">
          Sign in
        </button>

        <!-- Social Login -->
        <#if social?? && social.providers??>
        <div class="social-section">
          <div class="social-divider">Or continue with</div>
          <#list social.providers as p>
          <a href="${p.loginUrl}" class="btn-social">
            <#if p.providerId == "google">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <#elseif p.providerId == "github">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            </#if>
            ${p.displayName}
          </a>
          </#list>
        </div>
        </#if>
      </form>

      <!-- Register Link -->
      <#if realm.registrationAllowed>
      <div class="register-section">
        Don't have an account? <a href="${url.registrationUrl}" class="register-link">Sign up</a>
      </div>
      </#if>
    </div>

    <!-- Back to Home -->
    <a href="#" id="backToHomeLink" class="back-link">← Back to home</a>
  </div>
  
  <script>
    // Configurer le lien dynamiquement
    document.getElementById('backToHomeLink').href = APP_HOME_URL;
  </script>
</body>
</html>