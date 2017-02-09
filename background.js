chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
  if(response.method=="saviour"){

    function deleteHistory(){
      var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
      var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
      chrome.browsingData.remove({
        "since": oneWeekAgo
      }, {
        "appcache": false,
        "cache": false,
        "cookies": false,
        "downloads": false,
        "fileSystems": false,
        "formData": false,
        "history": true,
        "indexedDB": false,
        "localStorage": false,
        "pluginData": false,
        "passwords": false,
        "webSQL": false
      });
    }

    function getUrlParameters(myvar){

      var url = myvar;
      var urls=url.replace("#","&");
      var myurls = urls.split("?");
      var mylasturls = myurls[1];
      var mynexturls = mylasturls.split("&");

      var dict = {};

      for(i=0;i<mynexturls.length;i++){

        var url = mynexturls[i];

        url = url.split("=");

        url[1] = url[1].split("+").join(" ");

        dict[url[0]] = url[1];
      }

      return dict;
    }

    function main(){

      var key;
      try{
        chrome.storage.sync.get("secret_key", function (obj) {
        key = String(obj['secret_key']);
        // alert(key);
        });
      }
      catch(err){
        alert("some issues");
      }

      var queryInfo = {
          active: true,
          lastFocusedWindow: true
        };

      var par = (chrome.tabs.query(queryInfo, function(tabs) {

        var tab = tabs[0];

        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        var dict = getUrlParameters(url);
        
        if (dict['q']){
          alert(key);
          if(String(dict['q'])===key){
            deleteHistory();
          }
        }

        else if(dict['oq']){

          if(String(dict['oq'])===key){
            deleteHistory();
          }
        }

      }));
    }
      document.addEventListener('DOMContentLoaded', main() );
    }
});