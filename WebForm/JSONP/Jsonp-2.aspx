﻿<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Jsonp-2.aspx.vb" Inherits="JSONP_Jsonp_2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN">
<html>
    <head>
        <meta content="text/html; charset=Big5" http-equiv="content-type">
        <script type="text/javascript" src="js/json2.js"></script>
        <script type="text/javascript">
            window.onload = function() {
                function param(obj) {
                    var pairs = [];
                    for(var name in obj) {
                        var pair = encodeURIComponent(name) + '=' + 
                                   encodeURIComponent(obj[name]);
                        pairs.push(pair.replace('/%20/g', '+'));
                    }
                    return pairs.join('&');
                }
                
                function getScript(url, callback) {
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = url;
                    
                    // 跨瀏覽器處理 script 下載完成後的事件
                    script.onload = script.onreadystatechange = function() {
                        if (!this.readyState ||
                            this.readyState === "loaded" || 
                            this.readyState === "complete") {
                            this.onload = this.onreadystatechange = null;
                            document.getElementsByTagName('head')[0]
                                    .removeChild(this);
                            callback();
                        }
                    };
                    
                    document.getElementsByTagName('head')[0]
                            .appendChild(script);
                }
                
                function jsonp(option, callbackName) {
                    // 沒有url或伺服端要求的callbackName就結束
                    if(!option.url || !callbackName) {
                        return;
                    }
                    var data = option.data || {};
                    
                    // 建立暫時的函式
                    data[callbackName] = 'XD' + jsonp.jsc++;
                    window[data[callbackName]] = function(json) {
                        option.callback(json);
                    };
                    var url = option.url + '?' + param(data);
                    
                    // 取得 script 檔案
                    getScript(url, function() {
                         // script 下載並執行完後移除暫時的函式
                         window[data[callbackName]] = undefined;
                         try {
                             delete window[data[callbackName]];
                         }
                         catch(e) {}
                    });
                }
                jsonp.jsc = new Date().getTime();
                
                document.getElementById('search').onclick = function() {
                    jsonp({
                        url      : 'http://api.flickr.com/services/' + 
                                   'feeds/photos_public.gne',
                        data     : {
                            tagmode : 'any',
                            format  : 'json',
                            tags    : document.getElementById('tags').value
                        },
                        callback : function(data) {
                            var images = document.getElementById('images');
                            // 先清空所有的圖片
                            var length = images.childNodes.length;
                            for(var i = 0; i < length; i++) {
                                images.removeChild(images.firstChild);
                            }
                            // Flick 傳回 JSNOP，可以先自行研究一下當中的資料
                            // items 是個陣列，每個元素有個 media 特性
                            // media 特性上的 m 就是圖片網址
                            var items = data.items;
                            for(var i = 0; i < items.length; i++) {
                                var img = document.createElement('img');
                                img.src = items[i].media.m;
                                images.appendChild(img);
                            }
                        }
                    }, 'jsoncallback');
                };
            };
        </script>        
    </head>
    <body>
    	<input id="tags"><br>
		<button id="search">搜尋</button>
    	<div id="images"></div>
    </body>
</html>
