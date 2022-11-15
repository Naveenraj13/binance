import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { BuyOrderDto } from './dto/buy-order.dto';
import { SellOrderDto } from './dto/sell-order.dto';

@ApiTags('scrap')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('depth')
  async depth() {
    return this.appService.depth().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('trades')
  async trades() {
    return this.appService.trades().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('klines')
  async klines() {
    return this.appService.klines().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('tickerPriceStatistics')
  async tickerPriceStatistics() {
    return this.appService.tickerPriceStatistics().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('account')
  async account() {
    return this.appService.account().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('accountInfo')
  async accountInfo() {
    return this.appService.accountInfo().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('klineData')
  async klineData() {
    return this.appService.klineData().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('klineChart')
  async klineChart() {
    return this.appService.klineChart().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('openOrders')
  async openOrders() {
    return this.appService.openOrders().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('depositHistory')
  async depositHistory() {
    return this.appService.depositHistory().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Get('withdrawHistory')
  async withdrawHistory() {
    return this.appService.withdrawHistory().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Post('cancelOrder')
  async cancelOrder() {
    return this.appService.cancelOrder().then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Post('buyOrder')
  async buyOrder(@Body() buyOrderDto: BuyOrderDto) {
    return this.appService.buyOrder(buyOrderDto).then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Post('sellOrder')
  async sellOrder(@Body() sellOrderDto: SellOrderDto) {
    return this.appService.sellOrder(sellOrderDto).then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Post('marketBuyOrder/:quantity')
  async marketBuyOrder(@Param('quantity') quantity: number) {
    return this.appService.marketBuyOrder(quantity).then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

  @Post('marketSellOrder/:quantity')
  async marketSellOrder(@Param('quantity') quantity: number) {
    return this.appService.marketSellOrder(quantity).then(res => {
      if (res) {
        return {
          status: 200,
          value: res,
        };
      } else {
        return {
          status: 202,
          value: [],
        };
      }
    });
  }

}
