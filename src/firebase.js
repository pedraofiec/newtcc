// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import toast from "react-hot-toast";

// 🔧 Pegue do .env (CRA usa REACT_APP_*, Vite usa VITE_*)
const VAPID_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_FIREBASE_VAPID_KEY) ||
  process.env.REACT_APP_FIREBASE_VAPID_KEY;

// 🔧 SUBSTITUA pelos SEUS valores do console Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "SEU_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "SEU_AUTH_DOMAIN",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "SEU_PROJECT_ID",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "SEU_STORAGE_BUCKET",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "SEU_MESSAGING_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "SEU_APP_ID",
};

export const firebaseApp = initializeApp(firebaseConfig);

async function getMessagingWithSW() {
  const supported = await isSupported().catch(() => false);
  if (!supported) return null;

  if ("serviceWorker" in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    const exists = regs.some((r) => r.active?.scriptURL.endsWith("/firebase-messaging-sw.js"));
    if (!exists) {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }
  }

  return getMessaging(firebaseApp);
}

export async function requestFcmToken(vapidKey = VAPID_KEY) {
  try {
    const messaging = await getMessagingWithSW();
    if (!messaging) {
      console.warn("FCM não suportado neste navegador.");
      return null;
    }

    if (!vapidKey) {
      toast.error("VAPID key ausente. Defina no .env");
      console.error("Defina REACT_APP_FIREBASE_VAPID_KEY (CRA) ou VITE_FIREBASE_VAPID_KEY (Vite).");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      toast.error("Permissão de notificação negada.");
      return null;
    }

    const token = await getToken(messaging, { vapidKey });
    if (token) {
      toast.success("Notificações ativadas!");
      console.log("FCM Token:", token);
    } else {
      toast("Não foi possível obter o token FCM.");
    }
    return token;
  } catch (err) {
    console.error("Erro ao obter token FCM:", err);
    toast.error("Falha ao ativar notificações.");
    return null;
  }
}

export async function listenForegroundMessages() {
  const messaging = await getMessagingWithSW();
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    const title = payload?.notification?.title || "RotaVan";
    const body =
      payload?.notification?.body ||
      payload?.data?.body ||
      "Você tem uma nova atualização.";

    toast.custom(
      (t) => (
        <div
          className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black/5 p-4 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                🚐
              </span>
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-600">{body}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="inline-flex rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-right" }
    );
  });
}
