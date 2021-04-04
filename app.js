/*
* Sanjiv's website version 0.7
* Copyright 2012-2021, Sanjiv Rana
* www.sanjiv.info
* Last update: 04-04-2021
*/

document.addEventListener('DOMContentLoaded', function(event) {
    const home_url = document.URL.includes("/" || "/index.html");
    const projects_url = document.URL.includes("/projects.html");
    const skills_json = "https://gist.githubusercontent.com/eync/f6dca68878c4f0d7749feb0213576a69/raw/dcc388dc636545d7c9f6f705dd10ea4628bcf823/skills.json";
    const projects_json = "https://gist.githubusercontent.com/eync/a28c367b00fef2f5fb909d4eb2dc8e74/raw/dba205cd07c07c6c4891ff58bbdc29262624936d/projectlist.json";

    fetch(!projects_url ? skills_json : projects_json)
    .then(response => response.json())
    .then(json => formateData(json))

    function randomNumbers () {
      return Math.floor(Math.random() * 3 + 1)
    }

    async function formateData (data) {
      let addHtml = "";

            for (const z of data) {
                if (!projects_url) {
                addHtml += await `
                <p class="skill-title">${z.skill ? `${z.skill}` : "-"}</p>
                <div class="wrapper">
                <div class="selfgrade">
                ${(z.level === 0) ? `    
                <div class="placeholder"><div class="placetext">learning</div></div>
                <div class="placeholder"></div>` 
                : 
                (z.level === 1) ? `
                <div class="add"><div class="placeicon">🌎</div></div>
                <div class="placeholder"></div>`
                :
                (z.level === 2) ? `    
                <div class="add"></div>
                <div class="add"><div class="placeicon">🚀</div></div>`
                :
                (z.level === 3) ? `
                <div class="add"></div>
                <div class="add"></div>
                <div class="add"><div class="placeicon">🌌</div></div>`
                : `
                <div class="placeholder"></div>
                <div class="placeholder"></div>`
                }
                </div>
                </div>
                `
            } else {
                addHtml += await `
                <div class="span4 jc tc"><h6>${z.project ? `${z.project}` : "-"}</h6><span class="client">${z.client ? `${z.client}` : `-`}</span>
                ${z.links.image ? `<img class="blob${randomNumbers()}" src="${z.links.image}" alt="" width="100%">` : `<div class='noimg color${randomNumbers()} blob${randomNumbers()}'>IMAGE NOT AVAILABLE</div>`}
                <p>${z.description ? `${z.description}` : `-`}<span>${z.stuff.clang ? `${z.stuff.clang.join(", ")}` : `-`}</span></p></div>
                `
            }
            }
            load(addHtml)

        
    }

    function load(getHtml) {
        document.getElementById("loader").innerHTML = `${getHtml} ${projects_url ? ` <div class="span4 sc tc placeholder"><a href="https://sanjiv.info/" id="backtohome"><i class="fas fa-chevron-left"></i> back to home page</a></div>` : ""} `;    
    }
})