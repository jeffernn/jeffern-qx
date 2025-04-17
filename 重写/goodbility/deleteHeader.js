/***********************************************
> 应用名称：deleteHeader脚本
> 脚本作者：Jeffern
> 更新时间：2024-02-03
***********************************************/	

const version = 'V1.0.2';


function setHeaderValue(e,a,d){var r=a.toLowerCase();r in e?e[r]=d:e[a]=d}var modifiedHeaders=$request.headers;setHeaderValue(modifiedHeaders,"X-RevenueCat-ETag",""),$done({headers:modifiedHeaders});
