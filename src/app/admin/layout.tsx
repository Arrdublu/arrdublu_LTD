'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, type User } from 'firebase/auth';
import { Lock, LogOut, Shield, ArrowRight } from 'lucide-react';

const ADMIN_EMAILS = ['arrdublu@gmail.com', 'hi@arrdublu.us'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'password' | 'google'>('password');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePasswordReset = async () => {
    setError(null);
    setResetMessage(null);
    if (!emailInput) {
      setError('Please specify your Operator Email first to request a password reset.');
      return;
    }
    
    setResettingPassword(true);
    try {
      await sendPasswordResetEmail(auth, emailInput);
      setResetMessage('A security password reset link has been dispatched to your email.');
    } catch (err: any) {
      console.error("Password reset error: ", err);
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email format. Please specify a valid email address.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No operator found with this email address.');
      } else {
        setError(err.message || 'An unexpected error occurred during password reset request.');
      }
    } finally {
      setResettingPassword(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else {
        console.error("Sign-in error: ", err);
        setError('Authentication failed. If you are in the preview window, please open the app in a new tab (top right icon) to sign in, as popups are blocked in the preview.');
      }
    }
  };

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
    } catch (err: any) {
      console.error("Password sign-in error: ", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid operator credentials. Please check your email and password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format. Please specify a valid email address.');
      } else {
        setError(err.message || 'An unexpected error occurred during operator verification.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out error: ", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#02050e] text-slate-300 font-mono">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 border-r-cyan-500/30 border-b-cyan-500/10 border-l-cyan-500/30 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/20"></div>
        </div>
        <div className="text-sm tracking-wider uppercase animate-pulse text-cyan-400">
          Scanning Operator Credentials...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#02050e] text-slate-300 font-mono p-4">
        <div className="w-full max-w-md bg-slate-950/80 border border-slate-800 rounded-lg p-8 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-cyan-500 before:to-amber-500">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-full text-cyan-400">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2 text-center text-sans">
            sec_terminal_v2
          </h1>
          <p className="text-[10px] text-slate-500 mb-6 text-center uppercase tracking-widest border-b border-slate-800/60 pb-4">
            Restricted Area // Authorized Operators Only
          </p>

          <div className="flex border-b border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => { setLoginMethod('password'); setError(null); }}
              className={`flex-1 pb-2.5 text-xs uppercase tracking-wider font-mono text-center border-b-2 transition-all cursor-pointer ${
                loginMethod === 'password'
                  ? 'border-cyan-500 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              Password Key
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod('google'); setError(null); }}
              className={`flex-1 pb-2.5 text-xs uppercase tracking-wider font-mono text-center border-b-2 transition-all cursor-pointer ${
                loginMethod === 'google'
                  ? 'border-cyan-500 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              Google Key
            </button>
          </div>
          
          <div className="space-y-6">
            {error && (
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded text-xs text-red-300 font-sans text-center">
                {error}
              </div>
            )}
            {resetMessage && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded text-xs text-emerald-300 font-sans text-center">
                {resetMessage}
              </div>
            )}
            <div className="p-4 bg-slate-900/50 rounded border border-cyan-500/10 text-xs leading-relaxed text-slate-400 font-sans">
              <span className="text-cyan-400 font-bold font-mono">[!] NOTICE:</span> Access to this administrative interface requires credential verification. All operations are logged.
            </div>

            {loginMethod === 'password' ? (
              <form onSubmit={handleEmailPasswordSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">Operator Email</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="operator@arrdublu.us"
                    className="w-full px-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono placeholder-slate-600 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">Security Passphrase</label>
                    <button
                      type="button"
                      id="reset-passphrase-button"
                      onClick={handlePasswordReset}
                      disabled={resettingPassword}
                      className="text-[9px] text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-wider font-mono cursor-pointer disabled:opacity-50"
                    >
                      {resettingPassword ? 'Sending...' : 'Reset Passphrase'}
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono placeholder-slate-600 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={signingIn}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold rounded font-sans text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {signingIn ? 'Verifying...' : 'Authenticate Credentials'}
                </button>
              </form>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                aria-label="Sign in with Google account"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold rounded font-sans text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24">
                  <path
                    fill="#ea4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.82 1.05 15.093 0 12 0 7.354 0 3.317 2.673 1.34 6.577l3.926 3.188z"
                  />
                  <path
                    fill="#34a853"
                    d="M16.04 15.345c-1.07.697-2.44 1.112-4.04 1.112a6.974 6.974 0 0 1-6.686-4.909L1.388 14.77C3.394 18.73 7.464 21.5 12 21.5c3.214 0 6.12-.1 8.23-2.84l-4.19-3.315z"
                  />
                  <path
                    fill="#4285f4"
                    d="M22.5 12c0-.727-.086-1.424-.22-2.09H12v4.204h5.891a5.05 5.05 0 0 1-2.186 3.314l4.19 3.316C22.18 18.69 22.5 15.65 22.5 12z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.266 11.755A7.07 7.07 0 0 1 5.266 9.76l-3.926-3.18c-.84 1.66-1.34 3.52-1.34 5.42 0 1.91.5 3.77 1.34 5.43l3.926-3.175z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </button>
            )}

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-500 hover:text-cyan-400 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider font-mono">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Return to Main Sector
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#02050e] text-slate-300 font-mono p-4">
        <div className="w-full max-w-md bg-slate-950/80 border border-red-900/30 rounded-lg p-8 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-red-500">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-red-950/25 border border-red-500/20 rounded-full text-red-500">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-red-500 mb-2 uppercase text-center font-sans">
            Access Denied
          </h1>
          <p className="text-[10px] text-slate-500 mb-8 text-center uppercase tracking-widest border-b border-slate-800/60 pb-4">
            Error 403: Forbidden Sector
          </p>
          
          <div className="space-y-6">
            <div className="p-4 bg-red-950/20 rounded border border-red-500/20 text-xs leading-relaxed text-red-200/80 font-sans">
              <p className="font-bold mb-1 text-red-400 font-mono">[!] IDENTITY REJECTED:</p>
              The email address <span className="text-amber-400 font-semibold">{user.email || 'unknown'}</span> is not recognized in the system manifest. Access to administrative systems is strictly forbidden.
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium rounded text-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                Disconnect Identity
              </button>
              <Link
                href="/"
                className="flex-1 py-2.5 bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-800/30 text-cyan-400 font-semibold rounded text-xs flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Main Sector
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#02050e]">
      <div className="hidden border-r border-slate-800 bg-slate-950/50 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-slate-800 px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold text-white">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Arrdublu Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
              <Link
                href="/admin"
                aria-label="Admin Dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/discounts"
                aria-label="Manage Discounts"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/discounts'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Discounts
              </Link>
              <Link
                href="/admin/prints"
                aria-label="Manage Prints"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/prints'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Prints
              </Link>
              <Link
                href="/admin/free-downloads"
                aria-label="Manage Free Downloads"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/free-downloads'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Free Downloads
              </Link>
              <Link
                href="/admin/hero"
                aria-label="Manage Hero"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/hero'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Hero Slides
              </Link>
              <Link
                href="/admin/portfolio"
                aria-label="Manage Portfolio"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/portfolio'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/admin/logos"
                aria-label="Manage Logos"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/logos'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Client Logos
              </Link>
              <Link
                href="/admin/services"
                aria-label="Manage Services"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/services'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Services
              </Link>
              <Link
                href="/admin/store"
                aria-label="Manage Store Products"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/store'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Store Products
              </Link>
              <Link
                href="/admin/images"
                aria-label="Manage Website Images"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/images'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Website Images
              </Link>
              <Link
                href="/admin/newsletter"
                aria-label="Manage Newsletter"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === '/admin/newsletter'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                Newsletter
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-slate-800 bg-slate-950/80 font-mono">
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-slate-500 tracking-wider uppercase">Logged in as:</div>
              <div className="text-xs text-cyan-400 truncate" title={user?.email || ''}>
                {user?.email || 'N/A'}
              </div>
              <button
                onClick={handleSignOut}
                className="mt-2 w-full py-1.5 bg-red-950/20 hover:bg-red-950/50 border border-red-900/30 text-red-300 hover:text-red-200 text-[10px] rounded transition-all active:scale-[0.98] cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1"
              >
                <LogOut className="w-3 h-3" /> Disconnect link
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-950/20">
          {children}
        </main>
      </div>
    </div>
  );
}
