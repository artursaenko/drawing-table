import { ref } from "vue";

const messages = {
  de: {
    room: "Raum",
    teacher: "Lehrende",
    student: "Studierende",
    login: "Anmelden",
    logout: "Abmelden",
    tryTeacher: "Als Lehrende testen",
    viewStudent: "Als Studierende ansehen",
    demoHint:
      "Demo: Öffnen Sie diese Seite in einem zweiten Fenster. Was Sie hier als Lehrende zeichnen, erscheint dort in Echtzeit.",
    openSecond: "Zweites Fenster öffnen",
    password: "Passwort",
    send: "Anmelden",
    close: "Schließen",
    welcome: "Willkommen!",
    error: "Anmeldung fehlgeschlagen. Bitte prüfen Sie E-Mail und Passwort.",
    language: "Sprache",
    tool_text: "Text",
    tool_img: "Bild",
    tool_square: "Quadrat",
    tool_triangle: "Dreieck",
    tool_circle: "Kreis",
    tool_delete: "Alles löschen",
    tool_download: "Herunterladen",
    online: "Echtzeit verbunden",
    offline: "Keine Verbindung",
    syncError: "Synchronisierung fehlgeschlagen",
  },
  en: {
    room: "Room",
    teacher: "Teacher",
    student: "Student",
    login: "Sign in",
    logout: "Sign out",
    tryTeacher: "Try as teacher",
    viewStudent: "View as student",
    demoHint:
      "Demo: open this page in a second window. Whatever you draw here as a teacher appears there in real time.",
    openSecond: "Open second window",
    password: "Password",
    send: "Sign in",
    close: "Close",
    welcome: "Welcome!",
    error: "Sign-in failed. Please check your email and password.",
    language: "Language",
    tool_text: "Text",
    tool_img: "Image",
    tool_square: "Square",
    tool_triangle: "Triangle",
    tool_circle: "Circle",
    tool_delete: "Clear all",
    tool_download: "Download",
    online: "Live sync on",
    offline: "Offline",
    syncError: "Sync failed",
  },
  uk: {
    room: "Кімната",
    teacher: "Викладач",
    student: "Студент",
    login: "Увійти",
    logout: "Вийти",
    tryTeacher: "Спробувати як викладач",
    viewStudent: "Дивитися як студент",
    demoHint:
      "Демо: відкрийте цю сторінку в другому вікні. Те, що ви малюєте тут як викладач, з'являється там у реальному часі.",
    openSecond: "Відкрити друге вікно",
    password: "Пароль",
    send: "Увійти",
    close: "Закрити",
    welcome: "Вітаю!",
    error: "Не вдалося увійти. Перевірте email і пароль.",
    language: "Мова",
    tool_text: "Текст",
    tool_img: "Зображення",
    tool_square: "Квадрат",
    tool_triangle: "Трикутник",
    tool_circle: "Коло",
    tool_delete: "Очистити все",
    tool_download: "Завантажити",
    online: "З'єднано",
    offline: "Немає з'єднання",
    syncError: "Помилка синхронізації",
  },
};

export const languages = ["de", "en", "uk"];

const detect = () => {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && messages[saved]) return saved;
  } catch (e) {
    // storage unavailable, fall back to browser language
  }
  const nav = (navigator.language || "en").slice(0, 2);
  if (nav === "de") return "de";
  if (nav === "uk" || nav === "ru") return "uk";
  return "en";
};

export const lang = ref(detect());

export const setLang = (value) => {
  if (!messages[value]) return;
  lang.value = value;
  document.documentElement.lang = value;
  try {
    localStorage.setItem("lang", value);
  } catch (e) {
    // ignore
  }
};

export const t = (key) => messages[lang.value][key] || messages.en[key] || key;

document.documentElement.lang = lang.value;
