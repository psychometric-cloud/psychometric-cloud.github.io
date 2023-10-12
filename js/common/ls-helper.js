function lsHelper() {

  let downloadLS = (filename, text) => {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
  }

  let hila = () => {
    let str = JSON.stringify(localStorage)
    downloadLS("backup.txt", str)
  }

  let shaul = () => {
    let fileUrl = "https://psychometric-cloud.github.io/assets/backup.txt";

    utils.loadTxt(fileUrl, (txt) => {
      let data = JSON.parse(txt);

      if (data["q-labels"]) {
        localStorage.setItem("q-labels", data["q-labels"])
      }
      if (data["q-tags"]) {
        localStorage.setItem("q-tags", data["q-tags"]);
      }
      if (data["math-tests"]) {
        localStorage.setItem("math-tests", data["math-tests"])
      }
      if (data["en-tests"]) {
        localStorage.setItem("en-tests", data["en-tests"])
      }
      console.log("localStorage restored successfully!!")
    })
  }

  return {
    hila,
    shaul
  }
};





