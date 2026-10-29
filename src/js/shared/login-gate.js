(() => {
  "use strict";

  const SESSION_KEY = "ffdg-session-auth-v1";
  const USERS = Object.freeze({ "140784": "0784" });
  const gate = document.getElementById("ffdg-login-gate");
  const app = document.getElementById("ffdg-application");
  const form = document.getElementById("ffdg-login-form");
  const userInput = document.getElementById("ffdg-login-user");
  const passwordInput = document.getElementById("ffdg-login-password");
  const status = document.getElementById("ffdg-login-status");
  const submitButton = form.querySelector('[type="submit"]');

  const hasSession = () => {
    try { return window.sessionStorage.getItem(SESSION_KEY) === "1"; }
    catch { return false; }
  };

  const setAuthenticated = authenticated => {
    gate.hidden = authenticated;
    gate.setAttribute("aria-hidden", String(authenticated));
    app.inert = !authenticated;
    app.setAttribute("aria-hidden", String(!authenticated));
    document.body.classList.toggle("ffdg-authenticated", authenticated);
    if (!authenticated) {
      form.reset();
      status.textContent = "";
      window.setTimeout(() => userInput.focus(), 0);
    }
  };

  document.title = "FFDG L10/L11 GB200/GB300 NVIDIA RACKS";
  setAuthenticated(hasSession());

  form.addEventListener("submit", event => {
    event.preventDefault();
    const username = userInput.value.trim();
    const password = passwordInput.value;
    if (Object.prototype.hasOwnProperty.call(USERS, username) && USERS[username] === password) {
      try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      passwordInput.value = "";
      setAuthenticated(true);
      document.getElementById("nav-bat")?.focus({ preventScroll: true });
      return;
    }
    passwordInput.value = "";
    status.textContent = "Usuario o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.";
    passwordInput.focus();
  });

  gate.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const controls = [...gate.querySelectorAll("input:not(:disabled), button:not(:disabled)")];
    if (!controls.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element) || !event.target.closest("#ffdg-logout")) return;
    try { window.sessionStorage.removeItem(SESSION_KEY); } catch {}
    document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
    setAuthenticated(false);
  });

  submitButton.disabled = false;
})();
