'use client'
// TradingViewWidget.jsx
import React, { memo } from 'react';

import useTradingViewWidget from '@/app/hooks/useTradingViewWidget';
import { cn } from '@/lib/utils';

interface TradingViewWidgetProps{
  title:string;
  scriptUrl:string;
  config:Record<string,unknown>;
  height?:number;
  className?:string;


}

const  TradingViewWidget=({title,scriptUrl,config,height=600,className}:TradingViewWidgetProps)=> {
  // const container = useRef(null);
  const containerRef=useTradingViewWidget(scriptUrl,config,height)

 

  return (
    <div className="w-full">
      {
        title && <h2  className="font-semibold text-2xl text-gray-100 mb-5">{title}</h2>
      }
  
    <div className={cn('tradingview-widget-container', className)} ref={containerRef} >
      <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }}/>
      
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock chart</span></a><span className="trademark"> by TradingView</span></div>
    </div>
      </div>
  );
}

export default memo(TradingViewWidget);
