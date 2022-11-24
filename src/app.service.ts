import { Injectable } from '@nestjs/common';
import * as request from 'request';
import * as crypto from 'crypto';
import { SellOrderDto } from './dto/sell-order.dto';
import { BuyOrderDto } from './dto/buy-order.dto';
import { EmailService } from './email/email.service';
const Binance = require('node-binance-api');
@Injectable()
export class AppService {
    arr = [];
    constructor(private readonly emailService: EmailService) { }

    binance = new Binance().options({
        APIKEY: 'Gmg4rGFbaPlzNomMNwDbDsjUr9lm30DCUGzcxtcQhck2ymFrod2PfjJdVbSrS1N3',
        APISECRET: '4QtHUWSNUExbYiFMJQbIvPReoH9vDybFZDcHTQe5mh8NrUohvsd9xlyOk8whsLeQ'
    });

    depth() {
        const $headers = {
            'Content-Type': 'application/json; charset=utf-8',
        };
        const options = {
            uri: 'https://api.binance.com/api/v1/depth',
            method: 'GET',
            qs: {
                symbol: 'BTCUSDT',
                limit: 3
            },
            headers: $headers,
        };
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    trades() {
        const $headers = {
            'Content-Type': 'application/json; charset=utf-8',
        };
        const options = {
            uri: 'https://api.binance.com/api/v1/trades',
            method: 'GET',
            qs: {
                symbol: 'BTCUSDT',
                limit: 3
            },
            headers: $headers,
        };
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    klines() {
        const $headers = {
            'Content-Type': 'application/json; charset=utf-8',
        };
        const options = {
            uri: 'https://api.binance.com/api/v1/klines',
            method: 'GET',
            qs: {
                symbol: 'BTCUSDT',
                interval: '15m',
                limit: 3
            },
            headers: $headers,
        };
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    tickerPriceStatistics() {
        const $headers = {
            'Content-Type': 'application/json; charset=utf-8',
        };
        const options = {
            uri: 'https://api.binance.com/api/v1/ticker/24hr',
            method: 'GET',
            qs: {
                symbol: 'BTCUSDT'
            },
            headers: $headers,
        };
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    //SIGNED APIs.....................

    account() {
        const $headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'X-MBX-APIKEY': 'Gmg4rGFbaPlzNomMNwDbDsjUr9lm30DCUGzcxtcQhck2ymFrod2PfjJdVbSrS1N3'
        };

        const signature = crypto.createHmac('SHA256', '4QtHUWSNUExbYiFMJQbIvPReoH9vDybFZDcHTQe5mh8NrUohvsd9xlyOk8whsLeQ').update(`recvWindow=10000&timestamp=1499827319559`).digest('hex');

        const qs: any = {
            recvWindow: 10000,
            timestamp: Date.now(),
            signature
        };

        const options = {
            uri: 'https://api.binance.com/api/v3/account',
            method: 'GET',
            headers: $headers,
            qs
        };
        console.log({ options })
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(response));
                }
            });
        });
    }

    accountInfo() {
        return new Promise((resolve, reject) => {
            this.binance.mgAccount((error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    klineData() {
        return new Promise((resolve, reject) => {
            this.binance.candlesticks("BNBBTC", "1m", (error, ticks, symbol) => {
                console.info("candlesticks()", ticks);
                let last_tick = ticks[ticks.length - 1];
                let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
                console.info(symbol + " last close: " + close);
            }, { limit: 500, endTime: 1514764800000 });
        });
    }

    klineChart() {
        return new Promise((resolve, reject) => {
            this.binance.websockets.candlesticks(['BNBBTC'], "15m", (candlesticks) => {
                let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
                let { o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;

                if (ticks.x == true) {
                    if (ticks.c < ticks.o) {
                        console.log("candle pattern 1st condistion satisfied",this.arr)
                        this.arr.push(ticks);
                    }
                    if (ticks.c > ticks.o && this.arr.length > 0 && ticks.h > this.arr[0].h) {
                        console.log("candle pattern 2nd condistion satisfied", this.arr)
                        console.info(symbol + " " + interval + " candlestick update");
                        console.info("open: " + open);
                        console.info("high: " + high);
                        console.info("close: " + close);
                        this.sendMail();
                    } 
                    else {
                        this.arr.length = 0;
                    }
                }
                console.log('array length', this.arr.length)
                console.log('array element', this.arr)
            });
        });
    }

    openOrders() {
        return new Promise((resolve, reject) => {
            this.binance.openOrders(false, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    buyOrder(buyOrderDto: BuyOrderDto) {
        let params = {
            "symbol": "BNBBTC",
            "quantity": 0.011,
            "price": 0.016030
        };
        return new Promise((resolve, reject) => {
            this.binance.buy("BNBBTC", 0.011, 0.016030).then(result => {
                resolve(result);
            }).catch(error => {
                reject({ error })
            })
        });
    }

    cancelOrder() {
        return new Promise((resolve, reject) => {
            this.binance.cancel("BNBBTC", 1573696496).then(result => {
                resolve(result);
            }).catch(error => {
                reject({ error })
            })
        });
    }

    sellOrder(sellOrderDto: SellOrderDto) {
        let params = {
            symbol: 'BTCUSDT',
            quantity: 1,
            price: 0.069
        };
        return new Promise((resolve, reject) => {
            this.binance.sell(params, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    marketBuyOrder(quantity: number) {
        let params = {
            symbol: 'BTCUSDT',
            quantity
        };
        return new Promise((resolve, reject) => {
            this.binance.marketBuy(params, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    marketSellOrder(quantity: number) {
        let params = {
            symbol: 'BTCUSDT',
            quantity
        };
        return new Promise((resolve, reject) => {
            this.binance.marketSell(params, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    depositHistory() {
        return new Promise((resolve, reject) => {
            this.binance.depositHistory((error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    withdrawHistory() {
        return new Promise((resolve, reject) => {
            this.binance.withdrawHistory((error, response, body) => {
                //     if (error) {
                //         reject(error);
                //     } else {
                //         resolve(response);
                //     }
            });
        });
    }

    withdraw() {
        return new Promise((resolve, reject) => {
            //   const response =  this.binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
            //         console.info("candlesticks()", ticks);
            //         let last_tick = ticks[ticks.length - 1];
            //         let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
            //         console.info(symbol + " last close: " + close);
            //     }, { limit: 500, endTime: 1514764800000 });
            //     return response;
        })
    }

    sendMail() {
        return this.emailService.sendMail()
    }
}
