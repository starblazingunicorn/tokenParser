function convertToJSON() {
  const cssVariablesInput = document.getElementById("cssVariables").value;
  const fileName = document.getElementById("fileName").value || "my-variables.json";
  const cssVariablesArray = cssVariablesInput.split(";").filter(Boolean);
  const jsonOutput = {};

  cssVariablesArray.forEach((variable) => {
    const [fullVariable, value] = variable.split(":").map((s) => s.trim());
    const variableNames = fullVariable.split("--").filter(Boolean);
    
    // Only process variables that start with "--digi"
    if (variableNames[0] === "digi") {
      let currentObject = jsonOutput;

      variableNames.slice(1).forEach((name, index) => {
        if (index === variableNames.length - 2) {
          currentObject[name] = { value };
        } else {
          currentObject[name] = currentObject[name] || {};
          currentObject = currentObject[name];
        }
      });
    }
  });

  const jsonData = JSON.stringify(jsonOutput, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.getElementById("downloadLink");
  const jsonOutputTextarea = document.getElementById("jsonOutput");

  jsonOutputTextarea.value = jsonData;
  jsonOutputTextarea.style.display = "block";
  downloadLink.href = url;
  downloadLink.style.display = "block";
  downloadLink.setAttribute("download", fileName);
  
}