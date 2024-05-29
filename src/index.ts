import { Modal } from "bootstrap";

function main() {
  const corsiCard = document.getElementById("courses") as HTMLElement;

  corsiCard.addEventListener("click", () => window.location.assign(""));
}

const endpoint: string = "http://localhost:8000/";

async function card() {
  const response = await fetch(`${endpoint}users`);
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
  const response = await fetch(`${endpoint}courses`);
  let persone = await response.json();
  console.log(persone);
  let table: HTMLElement = document.getElementById('table')!;
  let tableRitirati: HTMLElement = document.getElementById('tableRitirati')!;
  let elemementHtml: string = "";
  let ritiratiHtml: string = "";

  persone.forEach((element: any, index: number) => {
    const dataIndex = index; // Assegna l'indice ad una variabile esterna
    if (element.azioni) {
      elemementHtml += `
                        <td id="cognome">${element.cognome}</td>
                        <td id="nome">${element.nome}</td>
                        <td id="email">${element.email}</td>
                        <td id="eta">${element.eta}</td>
                        <td id="sede">${element.sede}</td>
                        <td><a id="note" href="${element.note}">Note formatore</a></td>
                        <input type="hidden" id="azione" value=${element.azioni} />
                        <input type="hidden" id="pallino" value=${element.id} />
                        <td>
                            <div class="dropdown">
                                <button id="cambiaValore-${dataIndex}" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">▼</button>
                                <ul  class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                      <button type="button" class="btn btn-primary dropdown-item cambiaValoreBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${element.id}" data-index="${dataIndex}" href="#">
                                        ritira
                                      </button>
                                    </li>
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
                        <td>${element.eta}</td>
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
  });
  table.innerHTML = elemementHtml;
  tableRitirati.innerHTML = ritiratiHtml;

  document.getElementById('conferma')!.addEventListener('click', async () => {

    let cambiaValoreButtons = document.querySelectorAll('.cambiaValoreBtn');

    cambiaValoreButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const targetButton = event.target as HTMLElement;
        const id = targetButton.dataset.id;




        await fetch(`${endpoint}courses/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ azioni: false })
        });
        await compilaTabella();

      });
    });

    // const modal = new Modal(document.getElementById('exampleModal')!);
    // modal.hide();
  });

}
