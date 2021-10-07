const { token, slug } = require("./config")

const listSources = (source) => ({
  "url": `https://platform.segmentapis.com/v1beta/workspaces/${slug}/sources?page_size=100`,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
})

const listDestinations = (source) => ({
  "url": `https://platform.segmentapis.com/v1beta/workspaces/${slug}/sources/${source}/destinations?page_size=100`,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  },
})

const deleteSource = (source) => ({
  "url": `https://platform.segmentapis.com/v1beta/workspaces/${slug}/sources/${source}`,
  "method": "DELETE",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

const deleteDestination = (source, destination) => ({
  "url": `https://platform.segmentapis.com/v1beta/workspaces/${slug}/sources/${source}/destinations/${destination}`,
  "method": "DELETE",
  "timeout": 0,
  "headers": {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

const getSource = (source) => ({
  "url": `https://platform.segmentapis.com/v1beta/workspaces/${slug}/sources/${source}`,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  },
});

const getDestination = (source, destination) => ({
  "url": `https://platform.segmentapis.com/v1beta/workspaces/${slug}/sources/${source}/destinations/${destination}`,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

const getDestinationByConfigID = (id) => ({
  "url": `https://platform.segmentapis.com/v1beta/${id}`,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});



module.exports = {
  listSources,
  listDestinations,
  getSource,
  deleteSource,
  getDestination, 
  deleteDestination,
  getDestinationByConfigID
}