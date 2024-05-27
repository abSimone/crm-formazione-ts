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
}
}
async function compilaTabella() {
  const response = await fetch(`${endopoint}courses`);
  let persone = await response.json();
  console.log(persone);
  const tbody = document.querySelector('tbody')!;


  persone.forEach((persona: any) => {
    const row = document.createElement('tr');


    const cognomeCell = document.createElement('td');
    cognomeCell.textContent = persona.cognome;
    row.appendChild(cognomeCell);

    const nomeCell = document.createElement('td');
    nomeCell.textContent = persona.nome;
    row.appendChild(nomeCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = persona.email;
    row.appendChild(emailCell);

    const etaCell = document.createElement('td');
    etaCell.textContent = persona.eta;
    row.appendChild(etaCell);

    const sedeCell = document.createElement('td');
    sedeCell.textContent = persona.sede;
    row.appendChild(sedeCell);

    const noteCell = document.createElement('td');
    if (persona.note) {
      const noteLink = document.createElement('a');
      noteLink.href = '#';
      noteLink.textContent = 'Note formatore';
      noteCell.appendChild(noteLink);
    }
    row.appendChild(noteCell);



  });
}

compilaTabella();
//card();
main();
