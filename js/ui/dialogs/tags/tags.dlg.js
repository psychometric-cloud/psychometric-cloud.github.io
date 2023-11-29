function TagsDialog() {

  let qData;

  function open(_qData) {

    qData = _qData;
    $(".tags-panel").removeClass("show");

    if (qData.chapter.startsWith("math")) {
      $(".tags-panel").addClass("show");
      setSelection();
    }
  }

  //------------------------------------

  function setSelection() {
    $(".tags-panel .tag").removeClass("select");
    $(".tags-panel .lbl").removeClass("select");

    qData.qAreas.forEach(area => {
      $(`.tags-panel .tag[data-key="${area}"]`).addClass("select");
    });

    qData.labels.forEach(lbl => {
      $(`.tags-panel .lbl.${lbl}`).addClass("select");
    });
  }

  //------------------------------------

  function onTagClick(e) {
    let key = $(e.target).data("key");

    if (qData.qAreas.includes(key)) {
      qData.qAreas = qData.qAreas.filter((area) => {
        return area !== key;
      })
    } else {
      qData.qAreas.push(key);
    }

    tagsManager.storeQuestion(qData);
    setSelection();
  }

  //------------------------------------

  function onLabelClick(e) {
    let lbl = $(e.target).closest(".lbl");
    if (lbl) {
      let key = lbl.data("key");

      if (qData.labels.includes(key)) {
        qData.labels = qData.labels.filter((lbl) => {
          return lbl !== key;
        })
      } else {
        qData.labels.push(key);
      }

      labelsManager.storeQuestion(qData);
      setSelection();
    }
  }

  //---------------------------------------

  function init() {
    $(".tags-panel .bg").click(() => {
      $(".tags-panel").removeClass("show");
    })

    $(".tags-panel .tag").click((e) => {
      onTagClick(e);
    })

    $(".tags-panel .lbl").click((e) => {
      onLabelClick(e);
    });
  }

  init()

  return {
    open: open
  }
}
