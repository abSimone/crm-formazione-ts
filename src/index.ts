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
    labelDynamic += `<label>${element.ruolo}: ${element.email}</label>`;
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
card();
main();
