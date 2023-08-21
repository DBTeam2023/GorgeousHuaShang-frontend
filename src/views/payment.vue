<template>
    <div class="home">
      <button @click='goPayment'>去支付</button>
    </div>
  </template>
  
<script>
  // @ is an alias to /src
    import AlipaySdk from 'alipay-sdk';
    import AlipayFormData from 'alipay-sdk/lib/form';

    // 初始化插件
    const alipaySdk = new AlipaySdk({
    appId: '9021000125687021',
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    signType: 'RSA2', // 注意这里默认是RSA2, 但是我自己只能用RSA, 所以是RSA, 正常不要配置
    privateKey: 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDosDuqEX9u4M5RKmXfMlNLPMGkNs+b/cWYhjKGq2uHBU238zQB4pPetj4AakEpmZ3SyBt69bz8l03fbMp4SuwyjTctjRMpc67iOtPBd5Ik9n+BLcatKTtIL6QAkpPRo6cq4q5MV7EI6WWYfUtrlddFsLyd/w6ZdBdLzYf/fF7TUr5t65nmAd79qUDz58uHbgyCwmGmRXdcDPnMIk7h7vU8MpQIWceQRE5nnNSCo3HG4j7jZAR3n33F1q1Z9zPjVrVCK8iQsP8kgYBlgUMe4AFpVflRb/5JMIcSGZYllhN/pvX4Zabq6tzex0Gxs0TgQhYJNxMKrHT2Tzs9fo0HXUa7AgMBAAECggEAKCJ9qA/skwtjisxtVdowU8HfBJwPozBabLx46pGWsmtPxHLGfay/JKL6fsfVBX/hoQGy+7p3JnpSjD8PjUAfDXkeE1VKANRbTdonvC8LniSGSZnDswpxlzngZ9jgdkBsDRGcTr6xYoAfbfXulFf8EaEyZ24e7oj/m6uP0Zl6IajHuQSCVQr07ZfLtOsdih8Rg9yN4X3ceVBuqqL/g2/srfEVRB7Yk7qDlkHsNJOrB3noo3yANLtmPXbPP2i5o+MZotB9mqi5s+nUAx7K0C0BUmHqHWNQRpIAZj1ckwT0Lkf0Hu9i0bXH7o3FuPd976efpP5XFM65RNU17xBCAQyMgQKBgQD/BIFCqdli77OfYZqhJHpuYODRPiEjOHMPPnMaTFP8J9KWpSCggWfTp8ig6YiTzGHIDQ5/5QLoHn4RQW5OU1L7zhNSAw+69na0QIcyRzgRHLqmR2znkO6qEZEFHZwNBfBmKh+YNaGUj29xzDW4HPJgSy17gO+5vvhz0ER/7v8DQwKBgQDplbUXEGAPhLQENHrEFdkVdc8LeAAjyLi3ZIUfyOP72HTu9PnQ8RQdm6Z9XsT/yXkIj486oB49Cic5NvkFKefhLZIFnClpNzO+oBy3i+3WlhclZhtrSSVC0R3KdHc8NgqSjG2DioPyJ1r59SJxmyVUtZFhegZU8/n0cUDpX8irKQKBgQCkjRObIF3VKTaOMTzFnfQiJQDsA1r+jv4vZ+x9m6LVohyQeByFdPq56BndOtOWCttNap9ghzVI8eQG3mF+yOVS9bYhxTfxO/d8d+bE2o+i+xa1FIGBKlPWCV+6HVEEVkC4q5WXcYPBiIwwscQ3+PWsjNXcS2ZkRIWstUZ+BokmYQKBgQCxPhEAZEOP4vE585xoJ+/mcdNeb3sjrA5F0neVa7lbA5+PJsJdAmFyKgaGQSAYu4cksNJM+OyZAphKuOTyPx8dZZfUu+9MUD/qWNIRkJMzbgY4MaeCnCky7zy8v+0t+g/Brd73nmaKm8RTwOeW7tO/2FptbctaMRssmbdYnn7FKQKBgButzH9GzORma7IiBoVaQDtsiuLHAF+gboGNSw/1LCSdbNHJufyiWf1p5aruj4hNrxUzlFS9gSGugwjlneamz8pZFv1Yzb2PQpvoj2PgSH/T2QN4WOqfldVwPqI3AO8U2MHezL0Nbs833zKmRCy9PF0RZ3a/eqfkWXKjA5/Rq/u+',
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6LA7qhF/buDOUSpl3zJTSzzBpDbPm/3FmIYyhqtrhwVNt/M0AeKT3rY+AGpBKZmd0sgbevW8/JdN32zKeErsMo03LY0TKXOu4jrTwXeSJPZ/gS3GrSk7SC+kAJKT0aOnKuKuTFexCOllmH1La5XXRbC8nf8OmXQXS82H/3xe01K+beuZ5gHe/alA8+fLh24MgsJhpkV3XAz5zCJO4e71PDKUCFnHkEROZ5zUgqNxxuI+42QEd599xdatWfcz41a1QivIkLD/JIGAZYFDHuABaVX5UW/+STCHEhmWJZYTf6b1+GWm6urc3sdBsbNE4EIWCTcTCqx09k87PX6NB11GuwIDAQAB'
    })

    async function pay () {
    const formData = new AlipayFormData()
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get')
    // 配置回调接口
    formData.addField('notifyUrl', 'http://www.zzes1314.cn')
    // 设置参数
    formData.addField('bizContent', {
        outTradeNo: '1582976759798',
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: '0.01',
        subject: '商品',
        body: '商品详情',
    });
    // 请求接口
    const result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    );

    // result 为可以跳转到支付链接的 url
    console.log(result);
    }

    goPayment=()=>{
        pay()
    }


  </script>