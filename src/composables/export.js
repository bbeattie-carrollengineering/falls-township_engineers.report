import { ref} from "vue";

const isDownloading = ref(false)

async function exportItem(itemID, token) {
  try {
      const request = await fetch("https://fallstwp.maps.arcgis.com/sharing/rest/content/users/BBeattie_CEC/export", {
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
      
      return response.exportItemId
    } 

    catch (error) {
      console.error(error)
    }
}


function downloadItem(excelFileID, token) {
  setTimeout( async () => {
     try {
    const req = await fetch(`https://fallstwp.maps.arcgis.com/sharing/rest/content/items/${excelFileID}/data?token=${token}`, {
      method: 'GET',
  })

    const link = document.createElement('a');
    link.href = req.url
    link.download = 'test.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    isDownloading.value = false
} 

catch (error) {
  console.error(error)
}
  }, 20000)

}


export {
    exportItem,
    downloadItem,
    isDownloading
}