document.getElementById("save").onclick = function() {

  var dict={};

  var secret_key = document.getElementById("secret_key").value;
  alert("Sec");
  if(secret_key){
    alert("serc1");
    if(secret_key!=""){
      dict["secret_key"] = secret_key;
      alert("sec"+secret_key);
    }

  }

  var incognito_key = document.getElementById("incognito_key").value;
  
  alert("inc");
  if(incognito_key){
    alert("inc1");
    if(incognito_key!=""){
      dict["incognito_key"] = incognito_key;
      alert("inco"+incognito_key);
    }

  }
  chrome.storage.sync.set(dict, function() {

    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
    else{
      alert("saveed");
      // window.close();
    }
  });
}