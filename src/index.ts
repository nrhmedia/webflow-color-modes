$(document).ready(function () {
  const transitionConfig = { speed: 2000 };

  function applyTransition() {
    clearTimeout(window.myTimeout);
    $('html').addClass('transition');
    window.myTimeout = setTimeout(() => {
      $('html').removeClass('transition');
    }, transitionConfig.speed);
  }

  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function isFirstVisit() {
    return getCookie('first-visit') === null;
  }

  function setMode(isSecondary) {
    if (isSecondary) {
      $('body').attr('mode', 'secondary');
      setCookie('color-mode', 'secondary', 7);
    } else {
      $('body').attr('mode', 'primary');
      setCookie('color-mode', 'primary', 7);
    }
  }

  function changeMode(isSecondary) {
    applyTransition();
    setMode(isSecondary);
  }

  if (isFirstVisit()) {
    const startupMode = $('body').attr('startup-mode') === 'secondary';
    setMode(startupMode);
    setCookie('first-visit', 'true', 7);
  } else {
    const colorMode = getCookie('color-mode');
    setMode(colorMode === 'secondary');
  }

  $('.color-mode-toggle').on('click', function () {
    const isCurrentlySecondaryMode = $('body').attr('mode') === 'secondary';
    changeMode(!isCurrentlySecondaryMode);
  });

  $('.color-mode-primary').on('click', function () {
    changeMode(false);
  });

  $('.color-mode-secondary').on('click', function () {
    changeMode(true);
  });

  const styleTag = $('<style>');
  styleTag.html(`
html.transition,
html.transition body,
html.transition .button,
html.transition .nav_link,
html.transition .nav_link-text,
html.transition .nav_logo-link,
html.transition .slider-arrow,
html.transition .slider-arrow-container,
html.transition .divider,
html.transition .footer-logo,
html.transition .nav_color-wrapper,
html.transition .nav_menu-desktop-matte,
html.transition .nav_dropdown-list,
html.transition .nav_icon,
html.transition .nav_link-carrot,
html.transition .nav_title-container,
html.transition .nav_body-text,
html.transition .dropdown-icon,
html.transition .icon-nav-link,
html.transition .footer_logo-link,
html.transition .footer_link,
html.transition .footer_link-list-title,
html.transition .form_input-footer,
html.transition .footer_text,
html.transition .footer_color-wrapper,
html.transition .announcement-banner-container,
html.transition .fs-cc-banner_component,
html.transition .announcement-banner_close,
html.transition .matte-body,
html.transition .sidebar,
html.transition .matte-cover,
html.transition .menu-icon * {
transition: background-color ${transitionConfig.speed}ms,
color ${transitionConfig.speed}ms,
border-color ${transitionConfig.speed}ms;
}
`);
  $('head').append(styleTag);
});
