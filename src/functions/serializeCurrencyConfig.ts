// @ts-nocheck
function serializeCurrencyConfig(symbol) {
  return JSON.stringify({
    symbol: symbol !== false,
  });
}
