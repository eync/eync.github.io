/*
 * Sanjiv's website version 0.8
 * Copyright 2012-2021, Sanjiv Rana
 * www.sanjiv.info
 * Last update: 17-10-2021
 */
const GET_YEAR = new Date().getFullYear()

const VERSION = "v0.8"
const COPYRIGHT = `© ${GET_YEAR} Sanjiv Rana`

function APP() {
    document.getElementById('btn').addEventListener('click', function (event) {
        var link = document.getElementById('loader2');
        if (window.getComputedStyle(link).display === "none") {
            link.style.display = "grid";
            document.getElementById('btn').innerHTML = "Hide project listing"
            setTimeout(function() {
                link.classList.remove("fadeout");
                link.classList.add("fadein");
            }, 1000);
            
        } else {
            link.classList.remove("fadein");
            link.classList.add("fadeout");
            setTimeout(function() {
                link.style.display = "none";
                document.getElementById('btn').innerHTML = "Show more projects"
            }, 2000);
        }
    })

    const skills_json = "./data/skills.json";
    const projects_json = "./data/projects.json";
    const fetch_array = [skills_json, projects_json]

    function getData() {
        let savedData = []
        Promise.all([
            fetch_array.map(
                endpoint => fetch(endpoint, {
                    mode: 'cors'
                }).then(response => response.json()).then(json => savedData.push(json))
            )
        ])
        return formateData(savedData)
    }
    getData();

    function randomNumbers() {
        return Math.floor(Math.random() * 3 + 1)
    }

    async function formateData(data) {
        await data; 
        let addSkills = "";
        let addProjects = "";
        let clang = [];
        setTimeout(async () => {
            const skills_data = await data[0];
            const projects_data = await data[1];
            for (const skills of await skills_data) {
                addSkills += `
                <div class="span4">
                <p class="skill-title">${skills.skill ? `${skills.skill}` : "-"}</p>
                <div class="wrapper">
                <div class="selfgrade">
                ${(skills.level === 0) ? `    
                <div class="placeholder"><div class="placetext">learning</div></div>
                <div class="placeholder"></div>` 
                : 
                (skills.level === 1) ? `
                <div class="add"><div class="placeicon">🌎</div></div>
                <div class="placeholder"></div>`
                :
                (skills.level === 2) ? `    
                <div class="add"></div>
                <div class="add"><div class="placeicon">🚀</div></div>`
                :
                (skills.level === 3) ? `
                <div class="add"></div>
                <div class="add"></div>
                <div class="add"><div class="placeicon">🌌</div></div>`
                : `
                <div class="placeholder"></div>
                <div class="placeholder"></div>`
                }
                </div>
                </div>
                </div>
                `
            }
            for (const projects of await projects_data) {
                const noItems = `<span class="no-items">-</span>`;
                addProjects += `
                <div class="span4 jc tc boxed">
                    <h6>${projects.project ? `${projects.project}` : `${noItems}`}</h6>
                    <span class="client">${projects.client ? `${projects.client}` : `${noItems}`}</span>
                    ${projects.links.image ? 
                        `<img class="blob${randomNumbers()}" src="${projects.links.image}" alt="" width="100%">` :
                        `<div class='noimg color${randomNumbers()} blob${randomNumbers()}'>IMAGE NOT AVAILABLE</div>`
                    }
                    <p class="underline">${projects.description ? `${projects.description}` : `${noItems}`}</p>
                    <p class="information">
                        <span><img src="img/code.svg" class="icon" alt="code languages"/> ${projects.stuff.clang ? `${projects.stuff.clang.length > 0 ? projects.stuff.clang.join(", ") : projects.stuff.clang}` : `${noItems}`}</span>
                        <span><img src="img/software.svg" class="icon" alt="software"/> ${projects.stuff.software ? `${projects.stuff.software.length > 0 ? projects.stuff.software.join(", ") : projects.stuff.software}` : `${noItems}`}</span>
                        <span><img src="img/server.svg" class="icon" alt="server"/> ${projects.stuff.server ? `${projects.stuff.server}` : `${noItems}`}</span>
                        <span><img src="img/link.svg" class="icon" alt="server"/> ${projects.links.url ? `${projects.links.url}` : `${noItems}`}</span>
                        <span><img src="img/github.svg" class="icon" alt="server"/> ${projects.links.github ? `${projects.links.github}` : `${noItems}`}</span>
                    </p>
                </div>
                `
                for (let x of projects.stuff.clang) {
                    clang.push(x)
                }
            }
            loadClangs(clang.reduce(
                (gather, on) => {
                    gather[on] = 1 + gather[on] || 1;
                    return gather;
                }, {}
            ))
            load(addSkills, addProjects)
        }, 1000);

    }

    function loadClangs(lang) {
        for (let x in lang) document.getElementById("clanguages").innerHTML += `<div class="chip">${x} (${lang[x]})</div> `;
    }

    function load(st, nd) {
        document.getElementById("loader").innerHTML = `${st}`;
        document.getElementById("loader2").innerHTML = `${nd}`;
        document.getElementById("footer").innerHTML = `${COPYRIGHT} // ${VERSION}`
    }
}
(function CHECK_IF_LOADED() {
    let state = document.readyState;
    if(state === 'complete') return APP();
    else setTimeout(CHECK_IF_LOADED, 1000);
})();