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
    const projects_json = "./projectlist.json";

    fetch(!projects_url ? skills_json : projects_json)
    .then(response => response.json())
    .then(json => formateData(json))

    function randomNumbers () {
      return Math.floor(Math.random() * 3 + 1)
    }

    async function formateData (data) {
      let addHtml = "";
      let clang = [];

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
                const noItems = `<span class="no-items">-</span>`;
                addHtml += await `
                <div class="span4 jc tc">
                    <h6>${z.project ? `${z.project}` : `${noItems}`}</h6>
                    <span class="client">${z.client ? `${z.client}` : `${noItems}`}</span>
                    ${z.links.image ? 
                        `<img class="blob${randomNumbers()}" src="${z.links.image}" alt="" width="100%">` :
                        `<div class='noimg color${randomNumbers()} blob${randomNumbers()}'>IMAGE NOT AVAILABLE</div>`
                    }
                    <p class="underline">${z.description ? `${z.description}` : `${noItems}`}</p>
                    <p>
                        <span>${z.stuff.clang ? `<img src="img/code.svg" class="icon" alt="code languages"/>${z.stuff.clang.length > 0 ? z.stuff.clang.join(", ") : z.stuff.clang}` : `${noItems}`}</span>
                        <span>${z.stuff.software ? `<img src="img/software.svg" class="icon" alt="software"/>${z.stuff.software.length > 0 ? z.stuff.software.join(", ") : z.stuff.software}` : `${noItems}`}</span>
                        <span>${z.stuff.server ? `<img src="img/server.svg" class="icon" alt="server"/>${z.stuff.server}` : `${noItems}`}</span>
                        <span>${z.links.url ? `<img src="img/link.svg" class="icon" alt="server"/>${z.links.url}` : `${noItems}`}</span>
                        <span>${z.links.github ? `<img src="img/github.svg" class="icon" alt="server"/>${z.links.github}` : `${noItems}`}</span>
                    </p>
                </div>
                `
                for (let x of z.stuff.clang) {
                    clang.push(x)
                }
            }
            }
            load(addHtml)
            loadClangs(clang.reduce(
                (gather,on) => 
                  {
                    gather[on] = 1 + gather[on] || 1;
                    return gather;
                  },{}
            ))
        
    }
    
    function loadClangs(lang) {
        for(let x in lang) document.getElementById("clanguages").innerHTML += `<div class="chip">${x} (${lang[x]})</div> `;
    }

    function load(getHtml) {
        document.getElementById("loader").innerHTML = `${getHtml} ${projects_url ? ` <div class="span4 sc tc placeholder"><a href="https://sanjiv.info/" id="backtohome"><i class="fas fa-chevron-left"></i> back to home page</a></div>` : ""} `;    
    }
})