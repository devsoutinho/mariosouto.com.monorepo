interface Product {
  name: string;
  url: string;
  tag: "smarthome" | "setup";
  image?: string;
  description: string;
}


export const products: Product[] = [
  {
    "name": "Echo Show 15",
    "url": "https://amzn.to/3TKjeZH",
    "tag": "smarthome",
    "description": "Melhor coisa que eu coloquei na cozinha!!!"
  },
  {
    "name": "Canon T7i",
    "url": "https://amzn.to/3eVNYZ3",
    "tag": "setup",
    "description": "A camera principal do canal usada para gravar todos os vídeos desde o primeiro dia."
  }
];
