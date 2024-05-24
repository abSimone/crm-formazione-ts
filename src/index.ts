function main() {
  const corsiCard = document.getElementById("courses") as HTMLElement;

  corsiCard.addEventListener("click", () => window.location.assign(""));
}

const endopoint: string = "http://localhost:8000/";

async function card() {
  const response = await fetch(`${endopoint}users`);
  let data = await response.json();
  console.log(data);

}
card();
main();
