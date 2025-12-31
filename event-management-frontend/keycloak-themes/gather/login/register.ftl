<#import "template.ftl" as layout>

<@layout.registrationLayout>
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

      <!-- Card -->
      <div class="card">
        <div class="form-title">Create your account</div>

        <form id="kc-register-form" action="${url.registrationAction}" method="post">

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

          <#if !realm.registrationEmailAsUsername>
            <div class="form-group">
              <label for="username" class="form-label">Username</label>
              <input 
                type="text"
                id="username" 
                name="username" 
                class="form-input <#if messagesPerField?? && messagesPerField.existsError('username')>error</#if>"
                value="${(register.formData.username)!''}" 
                autocomplete="username"
                placeholder="Choose a username"
              />
              <#if messagesPerField?? && messagesPerField.existsError('username')>
                <div class="error-message">${messagesPerField.get('username')}</div>
              </#if>
            </div>
          </#if>

      
        

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="form-input <#if messagesPerField?? && messagesPerField.existsError('email')>error</#if>"
              value="${(register.formData.email)!''}" 
              autocomplete="email"
              placeholder="Enter your email"
            />
            <#if messagesPerField?? && messagesPerField.existsError('email')>
              <div class="error-message">${messagesPerField.get('email')}</div>
            </#if>
          </div>

          <#if passwordRequired?? && passwordRequired>
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input <#if messagesPerField?? && messagesPerField.existsError('password')>error</#if>"
                autocomplete="new-password"
                placeholder="Create a password"
              />
              <#if messagesPerField?? && messagesPerField.existsError('password')>
                <div class="error-message">${messagesPerField.get('password')}</div>
              </#if>
            </div>

            <div class="form-group">
              <label for="password-confirm" class="form-label">Confirm Password</label>
              <input 
                type="password" 
                id="password-confirm" 
                name="password-confirm" 
                class="form-input <#if messagesPerField?? && messagesPerField.existsError('password-confirm')>error</#if>"
                autocomplete="new-password"
                placeholder="Confirm your password"
              />
              <#if messagesPerField?? && messagesPerField.existsError('password-confirm')>
                <div class="error-message">${messagesPerField.get('password-confirm')}</div>
              </#if>
            </div>
          </#if>

          <#if recaptchaRequired??>
            <div class="form-group">
              <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
            </div>
          </#if>

          <button type="submit" class="btn-submit">Create Account</button>

          
      </form>

        <div class="register-section">
          Already have an account? 
          <a class="register-link" href="${url.loginUrl}">Sign in</a>
        </div>
      </div>

      <a href="#" id="backToHomeLink" class="back-link">← Back to home</a>
    </div>
</@layout.registrationLayout>