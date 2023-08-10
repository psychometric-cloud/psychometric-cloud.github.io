function TagsDialog() {

  let qData;

  function open(_qData) {
    qData = _qData;
    $(".tags-panel").addClass("show");
    $(".tags-panel .tags").removeClass("show");

    if (qData.chapter === eChapters.math1 || qData.chapter === eChapters.math2) {
      $(".tags-panel .tags").addClass("show");
      setSelection();
    }
  }

  //------------------------------------

  function setSelection() {
    $(".tags-panel .tag").removeClass("select");

    qData.qAreas.forEach(area => {
      $(`.tags-panel .tag[data-key="${area}"]`).addClass("select");
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

  function init() {
    $(".tags-panel .bg").click(() => {
      $(".tags-panel").removeClass("show");
    })

    $(".tags-panel .tag").click((e) => {
      onTagClick(e);
    })
  }


  init()

  return {
    open: open
  }
}
