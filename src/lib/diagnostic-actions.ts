'use server';

import { getAdminDb } from './firebase-admin';

export interface DiagnosticItem {
  id: string;
  name: string;
  category: 'database' | 'auth' | 'payments' | 'email' | 'environment';
  status: 'operational' | 'degraded' | 'error' | 'not_configured';
  latencyMs?: number;
  message: string;
  details?: Record<string, any>;
}

export interface DiagnosticReport {
  timestamp: string;
  overallStatus: 'healthy' | 'degraded' | 'unhealthy';
  items: DiagnosticItem[];
}

export async function runSystemDiagnostics(): Promise<DiagnosticReport> {
  const items: DiagnosticItem[] = [];
  const startTime = Date.now();

  // 1. Firestore Database Instance Check
  const fsInstanceStart = Date.now();
  let dbInstanceAvailable = false;
  try {
    const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
    if (db && typeof db.collection === 'function') {
      dbInstanceAvailable = true;
      items.push({
        id: 'fs-instance',
        name: 'Firestore Database Instance',
        category: 'database',
        status: 'operational',
        latencyMs: Date.now() - fsInstanceStart,
        message: 'getAdminDb() correctly initialized and returned valid Firestore object.',
      });
    } else {
      items.push({
        id: 'fs-instance',
        name: 'Firestore Database Instance',
        category: 'database',
        status: 'error',
        latencyMs: Date.now() - fsInstanceStart,
        message: 'getAdminDb() returned null or missing collection method.',
      });
    }
  } catch (err: any) {
    items.push({
      id: 'fs-instance',
      name: 'Firestore Database Instance',
      category: 'database',
      status: 'error',
      latencyMs: Date.now() - fsInstanceStart,
      message: `Failed to initialize Firestore instance: ${err?.message || String(err)}`,
    });
  }

  // 2. Firestore Query & Access Test
  if (dbInstanceAvailable) {
    const fsQueryStart = Date.now();
    try {
      const db = getAdminDb();
      // Execute a quick read test on 'portfolio' or 'settings'
      const snap = await db.collection('portfolio').limit(1).get();
      items.push({
        id: 'fs-query',
        name: 'Firestore Read & Query Access',
        category: 'database',
        status: 'operational',
        latencyMs: Date.now() - fsQueryStart,
        message: 'Successfully executed read query on Firestore database.',
        details: { docCount: snap.docs.length, empty: snap.empty },
      });
    } catch (err: any) {
      items.push({
        id: 'fs-query',
        name: 'Firestore Read & Query Access',
        category: 'database',
        status: 'error',
        latencyMs: Date.now() - fsQueryStart,
        message: `Query failed: ${err?.message || String(err)}`,
      });
    }
  }

  // 3. Stripe Service Check
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey && stripeKey.trim() !== '') {
    items.push({
      id: 'stripe-gw',
      name: 'Stripe Payment Gateway',
      category: 'payments',
      status: 'operational',
      message: 'STRIPE_SECRET_KEY is configured.',
      details: { keyPrefix: stripeKey.substring(0, 7) + '...' },
    });
  } else {
    items.push({
      id: 'stripe-gw',
      name: 'Stripe Payment Gateway',
      category: 'payments',
      status: 'degraded',
      message: 'STRIPE_SECRET_KEY is omitted. Checkout runs in simulated preview payment mode.',
    });
  }

  // 4. Nodemailer SMTP Check
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    items.push({
      id: 'smtp-mail',
      name: 'Nodemailer SMTP Dispatcher',
      category: 'email',
      status: 'operational',
      message: `Configured for ${smtpHost}:${process.env.SMTP_PORT || 587}`,
      details: { host: smtpHost, user: smtpUser },
    });
  } else {
    items.push({
      id: 'smtp-mail',
      name: 'Nodemailer SMTP Dispatcher',
      category: 'email',
      status: 'not_configured',
      message: 'SMTP credentials missing. Submissions will be stored in Firestore without outgoing emails.',
    });
  }

  // 5. Environment & Node Context
  items.push({
    id: 'env-context',
    name: 'Server Runtime Environment',
    category: 'environment',
    status: 'operational',
    latencyMs: Date.now() - startTime,
    message: `Next.js App Router server runtime active (${process.env.NODE_ENV || 'development'}).`,
    details: {
      nodeEnv: process.env.NODE_ENV,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'arrdublu-d1c06',
      databaseId: 'ai-studio-ea3451a5-84d6-45c9-845c-98289281a9a7',
    },
  });

  const hasErrors = items.some(i => i.status === 'error');
  const hasDegraded = items.some(i => i.status === 'degraded');

  return {
    timestamp: new Date().toISOString(),
    overallStatus: hasErrors ? 'unhealthy' : hasDegraded ? 'degraded' : 'healthy',
    items,
  };
}
