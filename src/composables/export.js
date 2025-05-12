import { ref } from "vue";

const isDownloading = ref(false)
let jobCompletionHandled = false;
const intervalPollingID = ref(null)


// Trigger's Feature Service Item Export To Excel File

async function triggerItemExport(itemID, username, token) {

  try {

    jobCompletionHandled = false

    const request = await fetch(`https://fallstwp.maps.arcgis.com/sharing/rest/content/users/${username}/export`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        itemID: itemID,
        exportParameters: JSON.stringify({
          layers: [
            {
              id: 0,
              where: "archive_project = 'No'",
              includeGeometry: false
            },
          ]
        }),
        f: 'json',
        exportFormat: "excel",
        token: token
      })
    })

    const response = await request.json()

    return response

  }

  catch (error) {
    console.error(error)
  }
}

// Fetches Excel File Item ID, Then Passes Download From Amazon S3 Bucket To Download In Client's Browser

async function downloadItem(exportResponse, username, token) {
  try {
    const req = await fetch(`https://fallstwp.maps.arcgis.com/sharing/rest/content/items/${exportResponse["exportItemId"]}/data?token=${token}`, {
      method: 'GET',
    })

    const link = document.createElement('a');
    link.href = req.url
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    isDownloading.value = false
    setTimeout(() => { deleteItem(exportResponse, username, token) }, 10000)
  }

  catch (error) {
    console.error(error)
  }
}

// Polls The Excel File Item ID Job Export, Until Completion, Then Calls Download Function, Then Stops Polling Interval

async function checkJobStatus(exportResponse, username, token) {

  if (!jobCompletionHandled) {

    let { exportItemId, jobId } = exportResponse
    const jobEndpoint = `https://fallstwp.maps.arcgis.com/sharing/rest/content/users/${username}/items/${exportItemId}/status?jobId=${jobId}&jobType=export&f=json&token=${token}`
    const jobResponse = await fetch(jobEndpoint)

    const jobResponseJSON = await jobResponse.json()

    if (jobResponseJSON.status === "completed") {
      console.log("completed")
      downloadItem(exportResponse, username, token)
      clearInterval(intervalPollingID.value)
      jobCompletionHandled = true
    }
  }

  else {
    console.log("else")
  }

  //Times Out Request After Polling For 2 Minutes
  setTimeout(() => {
    jobCompletionHandled = true
    isDownloading.value = false
    clearInterval(intervalPollingID.value)
  }, 120000)

}

async function deleteItem(exportResponse, username, token) {

  const itemEndpoint = `https://fallstwp.maps.arcgis.com/sharing/rest/content/users/${username}/items/${exportResponse["exportItemId"]}/delete`
  try {
    const deleteResponse = fetch(itemEndpoint, {
      method: 'POST',
      body: new URLSearchParams({
        token: token,
        f: 'json',
        permanentDelete: true
      })
    })
  }
  catch (error) {
    console.error(error)
  }
}


export {
  triggerItemExport,
  downloadItem,
  checkJobStatus,
  deleteItem,
  isDownloading,
  intervalPollingID,
  jobCompletionHandled
}