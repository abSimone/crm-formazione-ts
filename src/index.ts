import { table } from "console";
import internal from "stream";

function main() {
  const corsiCard = document.getElementById("courses") as HTMLElement;

  corsiCard.addEventListener("click", () => window.location.assign(""));
}

const endopoint: string = "http://localhost:8000/";

async function card() {
  const response = await fetch(`${endopoint}users`);
  let data = await response.json();
  console.log(data);

  let labelDynamic: string = '';

  data.forEach((element: any) => {
    labelDynamic += `<label class="d-block p-2">${element.ruolo}: ${element.email}</label>`;
  });

  let card: HTMLElement = document.getElementById('card')!;
  let elemementHtml: string = `
    <div id="info" class="card-body">
      <label class="d-block p-2">Aula</label>
      ${labelDynamic}
      <label class="d-block p-2"> Inizio: 15 -08 - 21 </label>
      <label class="d-block p-2"> Fine: 25 - 11 - 21 </label>
      <label class="d-block p-2"> Corso: Informatica </label>
      <label class="d-block p-2"> Esterno </label>
    </div>
  `;
  console.log(elemementHtml);

  card.innerHTML = elemementHtml;
}

if (window.location.pathname.includes('index.html')) {
  main();
} else if (window.location.pathname.includes('index3.html')) {
  card();
  compilaTabella();
}


async function compilaTabella() {
  const response = await fetch(`${endopoint}courses`);
  let persone = await response.json();
  console.log(persone);
  let table: HTMLElement = document.getElementById('table')!;
  let tableRitirati: HTMLElement = document.getElementById('tableRitirati')!;
  let elemementHtml: string = "";
  let ritiratiHtml: string = "";

  persone.forEach((element: any) => {
    if (element.azioni) {
      elemementHtml += `
    
                        <td>${element.cognome}</td>
                        <td>${element.nome}</td>
                        <td>${element.email}</td>
                        <td>${element.età}</td>
                        <td>${element.sede}</td>
                        <td><a href="${element.note}">Note formatore</a></td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-bs-toggle="dropdown" aria-expanded="false">▼</button>
                                <ul  class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a id="cambiaValore" class="dropdown-item" href="#">ritira</a></li>
                                    <li><a class="dropdown-item" href="#">Visualliza CV</a></li>
                                </ul>
                            </div>
                        </td>
                        </tr>`

    }
    else {
      ritiratiHtml += `
                        <td>${element.cognome}</td>
                        <td>${element.nome}</td>
                        <td>${element.email}</td>
                        <td>${element.età}</td>
                        <td>${element.sede}</td>
                        <td><a href="${element.note}">Note formatore</a></td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-bs-toggle="dropdown" aria-expanded="false">▼</button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            
                                    <li><a class="dropdown-item" href="#">Visualliza CV</a></li>
                                </ul>
                            </div>
                        </td>
                        </tr>`

    }
  }




  );
  table.innerHTML = elemementHtml;
  tableRitirati.innerHTML = ritiratiHtml;
}
