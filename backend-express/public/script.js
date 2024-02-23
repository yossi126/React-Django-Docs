// const result = dotenv.config();

window.onload = function () {
  // const baseUrl = process.env.API_BASE_URL;
  // console.log(baseUrl);
  const url = `https://view.officeapps.live.com/op/embed.aspx?src=https://test-deploy-50jq.onrender.com/api/download/65c162d4381fc16ef30cdaeb`;
  document.getElementById("docViewer").src = url;
  const dl = `https://test-deploy-50jq.onrender.com/api/download/65c162d4381fc16ef30cdaeb`;
  document.getElementById("downloadLink").href = dl;
};
