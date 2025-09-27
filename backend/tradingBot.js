// 🤖 UnionLedger — Real-Time Trading Bot
const axios = require('axios');
const EventEmitter = require('events');

class TradingBot extends EventEmitter {
  constructor() {
    super();
    this.isActive = false;
    this.strategies = new Map();
    this.positions = new Map();
    this.marketData = new Map();
    this.balance = 10000; // Demo balance in USD
    this.riskLimit = 0.02; // 2% risk per trade
    this.updateInterval = 5000; // 5 seconds for demo purposes
    this.intervalId = null;
  }

  // Start the trading bot
  async start() {
    if (this.isActive) {
      console.log("🤖 Trading bot is already active");
      return { status: "info", message: "Bot already active" };
    }

    this.isActive = true;
    console.log("🤖 Starting UnionLedger Trading Bot...");
    
    // Initialize with demo strategies
    this.initializeStrategies();
    
    // Start real-time market data polling
    this.intervalId = setInterval(() => {
      this.fetchMarketData();
    }, this.updateInterval);

    this.emit('botStarted', { timestamp: new Date().toISOString() });
    return { status: "success", message: "Trading bot started", balance: this.balance };
  }

  // Stop the trading bot
  async stop() {
    if (!this.isActive) {
      console.log("🤖 Trading bot is already inactive");
      return { status: "info", message: "Bot already inactive" };
    }

    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    console.log("🤖 Stopping UnionLedger Trading Bot...");
    this.emit('botStopped', { timestamp: new Date().toISOString() });
    return { status: "success", message: "Trading bot stopped" };
  }

  // Initialize demo trading strategies
  initializeStrategies() {
    // Simple moving average strategy
    this.strategies.set('SMA', {
      name: 'Simple Moving Average',
      enabled: true,
      parameters: {
        shortPeriod: 10,
        longPeriod: 20,
        riskPercent: 1
      }
    });

    // RSI strategy
    this.strategies.set('RSI', {
      name: 'Relative Strength Index',
      enabled: true,
      parameters: {
        period: 14,
        oversold: 30,
        overbought: 70,
        riskPercent: 1.5
      }
    });

    console.log("📊 Trading strategies initialized:", Array.from(this.strategies.keys()));
  }

  // Fetch real-time market data (demo implementation)
  async fetchMarketData() {
    try {
      // For demo purposes, we'll simulate market data
      // In production, this would connect to real APIs like Binance, Coinbase, etc.
      const symbols = ['BTC/USD', 'ETH/USD', 'MATIC/USD'];
      
      for (const symbol of symbols) {
        const price = this.generateMockPrice(symbol);
        const prevPrice = this.marketData.get(symbol)?.price || price;
        
        const marketUpdate = {
          symbol,
          price,
          change: ((price - prevPrice) / prevPrice * 100).toFixed(2),
          volume: Math.floor(Math.random() * 1000000),
          timestamp: new Date().toISOString()
        };

        this.marketData.set(symbol, marketUpdate);
        
        // Analyze for trading opportunities
        await this.analyzeMarket(symbol, marketUpdate);
      }

      // Emit market data update
      this.emit('marketUpdate', Object.fromEntries(this.marketData));
      
    } catch (error) {
      console.error("❌ Error fetching market data:", error.message);
    }
  }

  // Generate mock price data for demo
  generateMockPrice(symbol) {
    const basePrices = {
      'BTC/USD': 45000,
      'ETH/USD': 2800,
      'MATIC/USD': 0.85
    };

    const basePrice = basePrices[symbol] || 100;
    const volatility = 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * volatility;
    
    return parseFloat((basePrice * (1 + change)).toFixed(2));
  }

  // Analyze market for trading opportunities
  async analyzeMarket(symbol, marketData) {
    if (!this.isActive) return;

    for (const [strategyKey, strategy] of this.strategies) {
      if (!strategy.enabled) continue;

      const signal = this.generateTradingSignal(strategyKey, symbol, marketData);
      
      if (signal.action !== 'HOLD') {
        await this.executeTrade(symbol, signal);
      }
    }
  }

  // Generate trading signals based on strategy
  generateTradingSignal(strategyKey, symbol, marketData) {
    // Simplified signal generation for demo
    const price = marketData.price;
    const change = parseFloat(marketData.change);
    
    if (strategyKey === 'SMA') {
      // Simple trend following
      if (change > 2) {
        return { action: 'BUY', confidence: 0.7, reason: 'Strong upward momentum' };
      } else if (change < -2) {
        return { action: 'SELL', confidence: 0.6, reason: 'Strong downward momentum' };
      }
    } else if (strategyKey === 'RSI') {
      // Oversold/overbought conditions (simplified)
      if (change < -3) {
        return { action: 'BUY', confidence: 0.8, reason: 'Oversold condition' };
      } else if (change > 3) {
        return { action: 'SELL', confidence: 0.8, reason: 'Overbought condition' };
      }
    }

    return { action: 'HOLD', confidence: 0, reason: 'No clear signal' };
  }

  // Execute trading orders
  async executeTrade(symbol, signal) {
    const currentPrice = this.marketData.get(symbol).price;
    const riskAmount = this.balance * this.riskLimit;
    const quantity = (riskAmount / currentPrice).toFixed(6);

    const trade = {
      id: Date.now().toString(),
      symbol,
      action: signal.action,
      quantity: parseFloat(quantity),
      price: currentPrice,
      timestamp: new Date().toISOString(),
      strategy: 'Automated',
      confidence: signal.confidence,
      reason: signal.reason
    };

    // Update demo balance
    if (signal.action === 'BUY') {
      this.balance -= (currentPrice * trade.quantity);
    } else if (signal.action === 'SELL') {
      this.balance += (currentPrice * trade.quantity);
    }

    // Store position
    const positionKey = `${symbol}_${Date.now()}`;
    this.positions.set(positionKey, trade);

    console.log(`🔄 Executed ${signal.action} order:`, trade);
    
    // Emit trade event
    this.emit('tradeExecuted', trade);

    return trade;
  }

  // Get current bot status
  getStatus() {
    return {
      isActive: this.isActive,
      balance: parseFloat(this.balance.toFixed(2)),
      positions: this.positions.size,
      strategies: Array.from(this.strategies.entries()).map(([key, strategy]) => ({
        key,
        name: strategy.name,
        enabled: strategy.enabled
      })),
      marketData: Object.fromEntries(this.marketData),
      lastUpdate: new Date().toISOString()
    };
  }

  // Get trading history
  getTradingHistory(limit = 50) {
    const trades = Array.from(this.positions.values())
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
    
    return {
      trades,
      totalTrades: this.positions.size,
      currentBalance: parseFloat(this.balance.toFixed(2))
    };
  }

  // Update strategy settings
  updateStrategy(strategyKey, updates) {
    if (!this.strategies.has(strategyKey)) {
      return { status: "error", message: "Strategy not found" };
    }

    const strategy = this.strategies.get(strategyKey);
    Object.assign(strategy, updates);
    
    console.log(`📊 Updated strategy ${strategyKey}:`, strategy);
    return { status: "success", message: "Strategy updated", strategy };
  }
}

// Create singleton instance
const tradingBot = new TradingBot();

module.exports = {
  startBot: () => tradingBot.start(),
  stopBot: () => tradingBot.stop(),
  getBotStatus: () => tradingBot.getStatus(),
  getTradingHistory: (limit) => tradingBot.getTradingHistory(limit),
  updateStrategy: (key, updates) => tradingBot.updateStrategy(key, updates),
  getBotInstance: () => tradingBot
};