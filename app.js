const fs = require('fs');
const axios = require('axios').default;
const { listSources, listDestinations, deleteSource, deleteDestination } = require("./util.js")

// turn these on for using cleanup
// const defaultSourcesArr = require('./constants/allSources.json');
// const defaultDestinationsArr = require('./constants/allDestinations.json');

const deleteExtraSources = () => {
  axios(listSources())
  .then(res => {
    let tempArr = res.data.sources.map(el => el.name)
    tempArr.forEach(e => {
      e = e.split("/");
      if (!defaultSourcesArr.includes(e[e.length-1])) {
        console.log("deleted: ", e[e.length-1])
        axios(deleteSource(e[e.length-1]))
      }
    })
  })
  .catch(err => {
    if (err) throw err;
  })
}

const createDefaults = () => {
  axios(listSources())
  .then(res => {
    let tempArr = res.data.sources.map(el => el.name)
    let newArr = [];
    tempArr.forEach(e => {
      e = e.split("/")
      newArr.push(e[e.length-1])
      console.log('pushed: ', e[e.length-1]);
    })
    createDefaultDestinations(0, {}, newArr)
    fs.writeFile('./constants/allSources.json', JSON.stringify(newArr, null, 2), 'utf-8',
      (err) => {
        if (err) throw err;
      }
    )
  })
  .catch(err => {
    if (err) {
      fs.writeFile('./errors/listSource.json', JSON.stringify(err, null, 2), 'utf-8',
        (err) => {
          if (err) throw err;
        }
      )
    }
  })
}

const createDefaultDestinations = (i, allDestinations={}, defaultSourcesArr) => {
  if (i < defaultSourcesArr.length) {
    axios(listDestinations(defaultSourcesArr[i]))
    .then(res => {
      // console.log(res.data)
      var tempArr = res.data.destinations.map(el => el.name)
      var newArr = [];
      tempArr.forEach(e => {
        e = e.split("/")
        newArr.push(e[e.length-1])
        console.log('pushed: ', e[e.length-1]);
      })
      allDestinations[defaultSourcesArr[i]] = newArr;
      createDefaultDestinations(i+1, allDestinations, defaultSourcesArr);
    })
    .catch(err => {
      console.log('error!')
      fs.writeFile('error.json', JSON.stringify(err, null, 2), 'utf-8',
        (err) => {
          if (err) throw err;
        }
      )  
    })
  } else {
    fs.writeFile('./constants/allDestinations.json', JSON.stringify(allDestinations, null, 2), 'utf-8',
    (err) => {
      if (err) throw err;
    }) 
  }
}

const cleanupWorkspace = () => {
  for (const source in defaultDestinationsArr) {
    axios(listDestinations(source))
    .then(res => {
      res.data.destinations.forEach(destination => {
        var destinationName = destination.name.split("/");
        destinationName = destinationName[destinationName.length-1];
        if (!defaultDestinationsArr[source].includes(destinationName)) {
          console.log(`source is ${source} and destination is ${destinationName} : Deleted`)
          axios(deleteDestination(source, destinationName))
          .then(res => console.log(`deleted ${res.data}`))
          .catch(err => {
            if (err) throw err.data
          }) 
        }
      })
    })
    .catch(err => {
      if (err) throw err
    })    
  }
}

createDefaults();
// cleanupWorkspace();