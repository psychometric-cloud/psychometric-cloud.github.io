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

  filterByYear = (arr, filterBy, callback) => {

    res = [];

    for (let i = 0; i < arr.length; i++) {
      if (filterBy.selectedYear === arr[i].year && filterBy.selectedSeason === arr[i].season) {
        res.push(arr[i]);
      }
    }
    callback(res);
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
        if (arr[i].chapter.toLowerCase().startsWith(filterBy.selectedSubject)) {
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
        if (!_.isEmpty(filterBy.selectedAreas)) {
          filterByAreas(res2, filterBy, (res3) => {
            console.log(`Total Filtered Data: ${res3.length}`)
            callback(res3);
          })
        } else {
          console.log(`Total Filtered Data: ${res2.length}`)
          callback(res2);
        }
      })
    });
  }

  return {
    filter: filter
  }
}