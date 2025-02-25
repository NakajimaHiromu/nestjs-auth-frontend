// src/utils/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    signInWithCustomToken,
    signOut,
    getIdToken,
    onAuthStateChanged,
    User as FirebaseUser // この行を追加
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

// Firebaseの初期化
const initializeFirebase = () => {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApps()[0];
};

const app = initializeFirebase();
const auth = getAuth(app);

export const firebaseClient = {
    // カスタムトークンでサインイン後、IDトークンを取得
    signInWithToken: async (customToken: string) => {
        try {
            const userCredential = await signInWithCustomToken(auth, customToken);
            // IDトークンを取得 - これが重要
            const idToken = await getIdToken(userCredential.user);
            // IDトークンをローカルストレージに保存
            localStorage.setItem('token', idToken);
            return userCredential.user;
        } catch (error) {
            console.error('Firebase sign in failed:', error);
            throw error;
        }
    },

    // サインアウト
    signOut: async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            return true;
        } catch (error) {
            console.error('Firebase sign out failed:', error);
            throw error;
        }
    },

    // 現在のユーザーを取得
    getCurrentUser: () => {
        return auth.currentUser;
    },

    // 認証状態の変更を監視
    onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => {
        return onAuthStateChanged(auth, callback);
    },

    // IDトークンを更新
    refreshIdToken: async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                const idToken = await getIdToken(currentUser, true);
                localStorage.setItem('token', idToken);
                return idToken;
            } catch (error) {
                console.error('Failed to refresh token:', error);
                throw error;
            }
        }
        return null;
    }
};

export { auth };