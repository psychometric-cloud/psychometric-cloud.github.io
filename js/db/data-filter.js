function DataFilter() {

  isAreaInclude = (item, filterBy) => {
    for (i = 0; i < item.qAreas.length; i++) {
      if (!filterBy.selectedAreas.includes(item.qAreas[i])) {
        return false;
      }
    }
    return true;
  }

  //------------------------------------------

  filterByAreas = (arr, filterBy, callback) => {
    setTimeout(() => {
      res = [];

      for (let i = 0; i < arr.length; i++) {
        if (isAreaInclude(arr[i], filterBy)) {
          res.push(arr[i]);
        }
      }
      callback(res);
    }, 350);
  }

  //-----------------------------------------

  filterByPublishers = (arr, filterBy, callback) => {
    setTimeout(() => {
      res = [];

      for (let i = 0; i < arr.length; i++) {
        if (filterBy.selectedPublishers.includes(arr[i].publisher)) {
          res.push(arr[i]);
        }
      }
      callback(res);
    }, 350);
  }

  //-----------------------------------------

  filterBySubject = (arr, filterBy, callback) => {
    setTimeout(() => {
      res = [];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].chapter.startsWith(filterBy.selectedSubject)) {
          res.push(arr[i]);
        }
      }
      callback(res);
    }, 350);
  }

  //-----------------------------------------

  filter = (filterBy, callback) => {

    filterBySubject(qBank, filterBy, (res1) => {
      filterByPublishers(res1, filterBy, (res2) => {
        if (filterBy.actionType === eActionType.practice) {
          filterByAreas(res2, filterBy, (res3) => {
            callback(res3);
          })
        } else {
          callback(res2);
        }
      })
    });
  }

  return {
    filter: filter
  }
}