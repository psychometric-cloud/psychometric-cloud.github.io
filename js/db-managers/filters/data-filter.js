function DataFilter() {

  isAreaInclude = (item, filterBy) => {
    for (i = 0; i < filterBy.selectedAreas.length; i++) {
      if (item.qAreas.includes(filterBy.selectedAreas[i])) {
        return true;
      }
    }
    return false;
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

  filterByLabels = (arr, filterBy, callback) => {
    setTimeout(() => {

      if (_.isEmpty(filterBy.selectedLabels)) {
        callback(arr);
      } else {
        res = [];
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < filterBy.selectedLabels.length; j++) {
            if (arr[i].labels.length > 0) {
              if (arr[i].labels.includes(filterBy.selectedLabels[j])) {
                res.push(arr[i]);
                break;
              }
            }
          }
        }
        callback(res);
      }
    }, 150);
  }

  //-----------------------------------------

  shuffle = (data) => {
    let arr = [];
    let shuffledIndexes = utils.shuffleNums(data.length);

    for (var i = 0; i < shuffledIndexes.length; i++) {
      arr.push(data[shuffledIndexes[i]])
    }
    return arr;
  }

  //-----------------------------------------

  filter = (filterBy, callback) => {

    if (filterBy.actionType === eActionType.test) {
      filterBySubject(qBank, filterBy, (res1) => {
        filterByLabels(res1, filterBy, (res2) => {
          console.log(`Total Filtered Data: ${res2.length}`)
          callback(shuffle(res2));
        });
      });
    } else {
      filterBySubject(qBank, filterBy, (res1) => {
        filterByAreas(res1, filterBy, (res2) => {
          filterByLabels(res2, filterBy, (res3) => {
            console.log(`Total Filtered Data: ${res3.length}`)
            callback(shuffle(res3));
          });
        });
      });
    }
  }

  return {
    filter: filter
  }
}