'use strict';

/**
 * UnionLedger Wallet Ledger (starter)
 * - In-memory balances (good for local dev / demo)
 * - Replace later with DB/Redis + proper auth.
 */

const balances = new Map();

function normalizeWallet(wallet) {
  if (!wallet || typeof wallet !== 'string') return null;
  return wallet.trim();
}

function getBalance(wallet) {
  const w = normalizeWallet(wallet);
  if (!w) return 0;
  return balances.get(w) ?? 0;
}

function updateBalance(wallet, delta) {
  const w = normalizeWallet(wallet);
  if (!w) throw new Error('wallet_required');

  const n = Number(delta);
  if (!Number.isFinite(n)) throw new Error('delta_must_be_number');

  const current = getBalance(w);
  const next = current + n;

  if (next < 0) throw new Error('insufficient_funds');

  balances.set(w, next);
  return next;
}

/**
 * Optional utility for demo/testing
 */
function setBalance(wallet, amount) {
  const w = normalizeWallet(wallet);
  if (!w) throw new Error('wallet_required');

  const n = Number(amount);
  if (!Number.isFinite(n) || n < 0) throw new Error('amount_must_be_non_negative_number');

  balances.set(w, n);
  return n;
}

module.exports = {
  getBalance,
  updateBalance,
  setBalance,
};
