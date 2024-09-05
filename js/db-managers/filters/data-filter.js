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

      if (_.isEmpty(filterBy.selectedAreas)) {
        callback(arr);
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (isAreaInclude(arr[i], filterBy)) {
            res.push(arr[i]);
          }
        }
        callback(res);
      }
    }, 100);
  }

  //-----------------------------------------

  filterByLevels = (arr, filterBy, callback) => {

    if(_.isNumber(filterBy.minQuestion) && _.isNumber(filterBy.maxQuestion)){
      res = [];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].qNum >= filterBy.minQuestion && arr[i].qNum <= filterBy.maxQuestion) {
          res.push(arr[i]);
        }
      }
      callback(res);
    }else{
      callback(arr);
    }
  }


  //-----------------------------------------

  filterBySubject = (arr, filterBy, callback) => {
    setTimeout(() => {
      res = [];

      if(_.isNull(filterBy.selectedSubject)){
        callback(arr);
      }else{
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].chapter.toLowerCase().startsWith(filterBy.selectedSubject)) {
            res.push(arr[i]);
          }
        }
        callback(res);
      }
    }, 100);
  }


  //-----------------------------------------

  filterByLabels = (arr, filterBy, callback) => {
    setTimeout(() => {

      if (!filterBy.example) {
        callback(arr);
      } else {
        res = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].example ) {
              res.push(arr[i]);
          }
        }
        callback(res);
      }
    }, 100);
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

    filterBySubject(qBank, filterBy, (res1) => {
      filterByLevels(res1, filterBy, (res2) => {
        filterByAreas(res2, filterBy, (res3) => {
          filterByLabels(res3, filterBy, (res4) => {
            callback(shuffle(res4));
          });
        });
      });
    });
  }

  return {
    filter: filter
  }
}