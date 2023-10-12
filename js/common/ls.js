(function ls() {

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

      localStorage.setItem("q-labels", JSON.parse(data["q-labels"]))
      localStorage.setItem("q-tags", JSON.parse(data["q-tags"]))
      localStorage.setItem("math-tests", JSON.parse(data["math-tests"]))
      localStorage.setItem("en-tests", JSON.parse(data["en-tests"]))

      console.log("localStorage restored successfully!!")
    })
  }

  return {
    hila,
    shaul
  }
})();


