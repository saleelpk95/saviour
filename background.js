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

    function closeAllIncognito(){

        var queryInfo = {
          populate:true
        };

        alert("inside closeAllIncognito");
        chrome.windows.getAll(queryInfo,function(windows) {
        for (i=0;i<windows.length;i++){
            var window = windows[i];
          for(j=0;j<window.tabs.length;j++){
            tab = window.tabs[j];
              alert("inside loop");
            if(tab.pinned){
              alert("inco tab detected");
              chrome.tabs.remove(tab.id);
            }
            else{
              alert("inco not detected");
            }
          }
            
        }
        

      });
      // chrome.tabs.query(queryInfo, function(tab) {
      //   for (i=0;i<tab.length;i++){
      //     alert("inside loop");
      //     if(tab[i].pinned){
      //       alert("inco tab detected");
      //       chrome.tabs.remove(tab[i].id);
      //     }
      //     else{
      //       alert("inco not detected");
      //     }
      //   }
        

      // });
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

      var key="key not initialised";
      var incognito_key = "incognito_key not intitialised";
      try{
        chrome.storage.sync.get("secret_key", function (obj) {
        key = String(obj['secret_key']);
        // alert(key);
        });
      }
      catch(err){
        alert("some issues");
      }

      try{
        chrome.storage.sync.get("incognito_key", function (obj) {
        incognito_key = String(obj['incognito_key']);
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
          alert(incognito_key);
          if(String(dict['q'])===key){
            deleteHistory();
          }

          if(String(dict['q'])===incognito_key){
            alert("here");
            closeAllIncognito();
          }

        }

        else if(dict['oq']){

          if(String(dict['oq'])===key){
            deleteHistory();
          }

          if(String(dict['q'])===incognito_key){
            closeAllIncognito();
          }
        }

      }));
    }
      document.addEventListener('DOMContentLoaded', main() );
    }
});