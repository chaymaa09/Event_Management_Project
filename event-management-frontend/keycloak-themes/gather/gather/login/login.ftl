<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${msg("loginTitle",(realm.displayName!''))}</title>
  <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
  <div class="max-w-md w-full">

    <!-- Logo and Title -->
    <div class="text-center mb-12">
      <!-- Welcome text - Elegant & Modern -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-outfit font-light text-slate-800 tracking-wide">
          ${msg("welcomeBackTo")}
        </h1>
      </div>

      <!-- Logo avec brand name - Enhanced Design -->
      <div class="inline-flex items-center gap-4 relative mb-8">
        <div class="relative group">
          <!-- Glow effect background - Plus subtil -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

          <!-- Logo container - Design premium -->
          <div class="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 ring-4 ring-purple-100">
            <svg class="w-9 h-9 text-white drop-shadow-2xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"></path>
              <path d="M3 10h18"></path>
              <path d="M15 22v-4a2 2 0 0 1 2-2h4"></path>
            </svg>
          </div>
        </div>

        <!-- Brand name with sophisticated gradient -->
        <span class="font-outfit font-black text-4xl md:text-5xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
          GATHER
        </span>
      </div>

      <!-- Tagline subtil -->
      <p class="text-slate-500 font-medium text-sm tracking-wider uppercase mb-6">
        ${msg("tagline")}
      </p>

      <!-- Decorative line - Plus sophistiquée -->
      <div class="flex items-center justify-center gap-3">
        <div class="h-0.5 w-16 bg-gradient-to-r from-transparent via-purple-300 to-purple-500 rounded-full"></div>
        <div class="flex gap-1.5">
          <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
          <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
          <div class="w-2 h-2 bg-purple-300 rounded-full"></div>
        </div>
        <div class="h-0.5 w-16 bg-gradient-to-l from-transparent via-purple-300 to-purple-500 rounded-full"></div>
      </div>
    </div>

    <!-- Login Form -->
    <div class="bg-white rounded-2xl shadow-xl p-8">

      <form id="kc-form-login" action="${url.loginAction}" method="post">

        <!-- Error Message (Keycloak global message) -->
        <#if message?? && message.summary??>
          <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            ${message.summary}
          </div>
        </#if>

        <!-- Email/Username Field -->
        <div class="mb-5">
          <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
            <#if realm.loginWithEmailAllowed && !realm.registrationEmailAsUsername>
              ${msg("usernameOrEmail")}
            <#else>
              ${msg("username")}
            </#if>
          </label>

          <input
            type="text"
            id="username"
            name="username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all <#if messagesPerField?? && messagesPerField.existsError('username')> border-red-500</#if>"
            value="${login.username!''}"
            placeholder="${msg('usernamePlaceholder')}"
            autocomplete="username"
            autofocus
          />

          <#if messagesPerField?? && messagesPerField.existsError('username')>
            <div class="mt-1 text-sm text-red-600">
              ${messagesPerField.get('username')}
            </div>
          </#if>
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
            ${msg("password")}
          </label>

          <input
            type="password"
            id="password"
            name="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all <#if messagesPerField?? && messagesPerField.existsError('password')> border-red-500</#if>"
            placeholder="${msg('passwordPlaceholder')}"
            autocomplete="current-password"
          />

          <#if messagesPerField?? && messagesPerField.existsError('password')>
            <div class="mt-1 text-sm text-red-600">
              ${messagesPerField.get('password')}
            </div>
          </#if>
        </div>

        <!-- Remember me + Forgot password (optionnels) -->
        <div class="mb-6 flex items-center justify-between">
          <#if realm.rememberMe>
            <label class="inline-flex items-center gap-2 text-gray-600 text-sm">
              <input type="checkbox" name="rememberMe" id="rememberMe" <#if login.rememberMe??>checked</#if> />
              <span>${msg("rememberMe")}</span>
            </label>
          <#else>
            <span></span>
          </#if>

          <#if realm.resetPasswordAllowed>
            <a href="${url.loginResetCredentialsUrl}" class="text-purple-600 font-semibold hover:text-purple-700 transition-colors text-sm">
              ${msg("doForgotPassword")}
            </a>
          </#if>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
        >
          ${msg("doLogIn")}
        </button>

        <!-- Social providers (Google/GitHub...) -->
        <#if social?? && social?is_hash && social.providers?? && social.providers?is_sequence && (social.providers?size > 0)>
          <div class="mt-6">
            <div class="text-center text-gray-500 text-sm font-medium mb-3">${msg("orSignInWith")}</div>
            <div class="flex flex-col gap-3">
              <#list social.providers as p>
                <a class="w-full border border-gray-300 rounded-lg py-3 px-4 text-center font-semibold hover:bg-gray-50 transition-all"
                   href="${p.loginUrl}">
                  ${p.displayName}
                </a>
              </#list>
            </div>
          </div>
        </#if>

      </form>

      <!-- Sign Up Link -->
      <#if realm.registrationAllowed>
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            ${msg("noAccount")}
            <a href="${url.registrationUrl}" class="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              ${msg("doRegister")}
            </a>
          </p>
        </div>
      </#if>
    </div>

    <!-- Back to Home -->
    <div class="text-center mt-6">
      <a href="${url.loginUrl}" class="text-gray-600 hover:text-gray-900 transition-colors">
        ${msg("backToHome")}
      </a>
    </div>

  </div>
</div>
</body>
</html>
