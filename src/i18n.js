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
      "So testen Sie die Demo: 1) Klicken Sie hier auf „Als Lehrende testen“. 2) Öffnen Sie ein zweites Fenster, dort sind Sie Studierende. 3) Zeichnen Sie hier: Im zweiten Fenster erscheint alles sofort.",
    demoHintTeacher:
      "Sie sind jetzt Lehrende. Öffnen Sie ein zweites Fenster als Studierende und zeichnen Sie hier: Dort erscheint alles sofort.",
    demoHintStudent:
      "Dieses Fenster zeigt die Ansicht der Studierenden. Zeichnen Sie im ersten Fenster als Lehrende: Hier erscheint alles sofort.",
    openSecond: "Zweites Fenster als Studierende öffnen",
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
      "How to try the demo: 1) Click “Try as teacher” here. 2) Open a second window, you are a student there. 3) Draw here and it appears in the second window instantly.",
    demoHintTeacher:
      "You are the teacher now. Open a second window as a student and draw here: everything appears there instantly.",
    demoHintStudent:
      "This window shows the student view. Draw in the first window as the teacher: everything appears here instantly.",
    openSecond: "Open second window as student",
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
      "Як спробувати демо: 1) Натисніть тут «Спробувати як викладач». 2) Відкрийте друге вікно, там ви студент. 3) Малюйте тут, і в другому вікні все з’явиться миттєво.",
    demoHintTeacher:
      "Тепер ви викладач. Відкрийте друге вікно як студент і малюйте тут: там усе з’явиться миттєво.",
    demoHintStudent:
      "Це вікно показує те, що бачить студент. Малюйте в першому вікні як викладач, і тут усе з’явиться миттєво.",
    openSecond: "Відкрити друге вікно як студент",
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
