document.getElementById("save").onclick = function() {

  var key = document.getElementById("key").value;
  var dict={};
  dict["secret_key"] = key;
  chrome.storage.sync.set(dict, function() {

    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
    else{
      alert("saveed");
      window.close();
    }
  });
}