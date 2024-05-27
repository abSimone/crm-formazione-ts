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
                        <td id="cognome">${element.cognome}</td>
                        <td id="nome">${element.nome}</td>
                        <td id="email">${element.email}</td>
                        <td id="eta">${element.eta}</td>
                        <td id="sede">${element.sede}</td>
                        <td><a id="note" href="${element.note}">Note formatore</a></td>
                        <input type="hidden" id="azione" value=${element.azioni} />
                        <input type="hidden" id="id" value=${element.id} />
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-bs-toggle="dropdown" aria-expanded="false">▼</button>
                                <ul  class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button id="cambiaValore" class="dropdown-item" href="#">ritira</button></li>
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

  let cambiaValoreButton = document.getElementById('cambiaValore') as HTMLElement | null;
  console.log(cambiaValoreButton);
  
  if (cambiaValoreButton) {
    console.log(cambiaValoreButton);
    cambiaValoreButton.addEventListener('click', async () => {
      let oggetto = {
        id: (document.getElementById('id')! as HTMLInputElement).value,
        nome: document.getElementById('nome')!.innerText,
        cognome: document.getElementById('cognome')!.innerText,
        eta: document.getElementById('eta')!.innerText,
        note: document.getElementById('note')!.innerText,
        azioni: !!(document.getElementById('cognome')! as HTMLInputElement).value,
      };
      await fetch(`${endopoint}courses/${oggetto.id}`, {
        method: 'PUT',
        body: JSON.stringify(oggetto)
      });
      compilaTabella();
      console.log(oggetto);
    });
  }

  // document.getElementById('cambiaValore')!.addEventListener('click', async () => {
  //   let oggetto = {
  //     id: (document.getElementById('id')! as HTMLInputElement).value,
  //     nome: document.getElementById('nome')!.innerText,
  //     cognome: document.getElementById('cognome')!.innerText,
  //     eta: document.getElementById('eta')!.innerText,
  //     note: document.getElementById('note')!.innerText,
  //     azioni: !!(document.getElementById('cognome')! as HTMLInputElement).value,
  //   };
  //   const response = await fetch(`${endopoint}courses/${oggetto.id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(oggetto)
  //   });
  //   compilaTabella();
  //   console.log(oggetto);
    
  // });
  
}

// function aggiornaTabella() {
//   document.getElementById('cambiaValore')!.addEventListener('click', () => {
//     console.log(element);



//     let table: HTMLElement = document.getElementById('table')!;
//     let tableRitirati: HTMLElement = document.getElementById('tableRitirati')!;
//     let elemementHtml: string = "";
//     let ritiratiHtml: string = "";

//     utenti.forEach((element: any) => {
//       if (element.azioni) {
//         elemementHtml += `
    
//                         <td>${element.cognome}</td>
//                         <td>${element.nome}</td>
//                         <td>${element.email}</td>
//                         <td>${element.età}</td>
//                         <td>${element.sede}</td>
//                         <td><a href="${element.note}">Note formatore</a></td>
//                         <td>
//                             <div class="dropdown">
//                                 <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
//                                     data-bs-toggle="dropdown" aria-expanded="false">▼</button>
//                                 <ul  class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                                     <li><button id="cambiaValore" class="dropdown-item" href="#">ritira</button></li>
//                                     <li><a class="dropdown-item" href="#">Visualliza CV</a></li>
//                                 </ul>
//                             </div>
//                         </td>
//                         </tr>`
//       }
//       else {
//         ritiratiHtml += `
//                         <td>${element.cognome}</td>
//                         <td>${element.nome}</td>
//                         <td>${element.email}</td>
//                         <td>${element.età}</td>
//                         <td>${element.sede}</td>
//                         <td><a href="${element.note}">Note formatore</a></td>
//                         <td>
//                             <div class="dropdown">
//                                 <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
//                                     data-bs-toggle="dropdown" aria-expanded="false">▼</button>
//                                 <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            
//                                     <li><a class="dropdown-item" href="#">Visualliza CV</a></li>
//                                 </ul>
//                             </div>
//                         </td>
//                         </tr>`

//       }
//     });
//     table.innerHTML = elemementHtml;
//     tableRitirati.innerHTML = ritiratiHtml;
//   })
// }


