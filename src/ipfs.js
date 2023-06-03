export const createAnduploadFileToIpfs = async (metaData) => {
  var formdata = new FormData();
  formdata.append("data", JSON.stringify(metaData));

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    "https://endpoints.in/endpoints/ipfs/add-Ipfs.php",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => ({
      path: result,
      link: `https://endpoints.in/endpoints/ipfs/fetch-ipfs.php?id=${result}`,
    }))
    .catch((error) => console.log("error", error));
};
// export const createAnduploadFileToIpfs = async (metaData) => {
//   const blob = new Blob([JSON.stringify(metaData)], {
//     type: "application/json",
//   });

//   const files = [
//     new File(["contents-of-file-1"], "plain-utf8.txt"),
//     new File([blob], "ipfs.json"),
//   ];

//   const resultsSaveMetaData = await client.put(files, {});

//   return {
//     path: resultsSaveMetaData,
//     link: `https://${resultsSaveMetaData}.ipfs.dweb.link/ipfs.json`,
//   };
// };

export const getIpfsUrI = (fingerprint) => {
  return `https://endpoints.in/endpoints/ipfs/fetch-ipfs.php?id=${fingerprint}`;
  // return `https://ipfs.io/ipfs/${fingerprint}`;
};
