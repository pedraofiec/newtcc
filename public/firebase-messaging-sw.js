/* public/firebase-messaging-sw.js */
/* eslint-disable no-undef */

// Use a versão compat no SW (é a forma suportada pelo FCM no worker)
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// 🔧 SUBSTITUA pelos SEUS valores do console Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCjALKEFFvWBdFFfDAiscUV-uUwhaLgwiU",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
});

// Inicializa o Messaging no SW
const messaging = firebase.messaging();

// Notificações em segundo plano (background)
messaging.onBackgroundMessage((payload) => {
  // payload.data ou payload.notification (depende de como você envia do servidor)
  const title = (payload.notification && payload.notification.title) || "RotaVan";
  const body =
    (payload.notification && payload.notification.body) ||
    (payload.data && payload.data.body) ||
    "Você tem uma nova atualização.";

  const icon =
    (payload.notification && payload.notification.icon) ||
    "/favicon.ico";

  self.registration.showNotification(title, {
    body,
    icon,
    data: payload?.data || {},
    // tag, actions, image, badge... (opcionais)
  });
});

// Permite abrir a aba correta ao clicar
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification?.data?.click_action || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          client.postMessage({ type: "NOTIFICATION_CLICKED", data: event.notification.data });
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
