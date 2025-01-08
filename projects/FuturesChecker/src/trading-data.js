export class TradingData {
    constructor(symbol = "btcusdt", interval = "1s") {
        this.symbol = symbol.toLowerCase();
        this.interval = interval;
        this.websocketUrl = `wss://stream.binance.com:9443/ws/${this.symbol}@kline_${this.interval}`;
        this.socket = null;
        this.onKlineClose = null;
        this.maxPrice = -1;
        this.minPrice = -1;
    }
    start() {
        this.socket = new WebSocket(this.websocketUrl);

        this.socket.onopen = () => {
            console.log("WebSocket connection established for trading data.");
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket Error (TradingData):", error);
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.e && data.e === "kline") {
                    const kline = data.k;

                    if (kline.x) {
                        const currentHigh = parseFloat(kline.h);
                        if (this.maxPrice === -1 || currentHigh > this.maxPrice) {
                            this.maxPrice = currentHigh;
                        }

                        const currentLow = parseFloat(kline.l);
                        if (this.minPrice === -1 || currentLow < this.minPrice) {
                            this.minPrice = currentLow;
                        }

                        const processedData = {
                            openPrice: parseFloat(kline.o).toFixed(2),
                            closePrice: parseFloat(kline.c).toFixed(2),
                            highPrice: this.maxPrice.toFixed(2),
                            lowPrice: this.minPrice.toFixed(2),
                            volume: parseFloat(kline.v).toFixed(5),
                            price: parseFloat(kline.c).toFixed(2),
                        };

                        if (typeof this.onKlineClose === "function") {
                            this.onKlineClose(processedData);
                        }
                    }
                }
            } catch (error) {
                console.error("Error parsing TradingData WebSocket message:", error);
            }
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`TradingData WebSocket closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.warn("TradingData WebSocket connection died unexpectedly. Attempting to reconnect...");
                setTimeout(() => this.start(), 5000);
            }
        };
    }

    setKlineCloseCallback(callback) {
        this.onKlineClose = callback;
    }

    stop() {
        if (this.socket) {
            this.socket.close();
        }
    }
}