
const products = [
  {
    name: "Echo Show 15",
    link: "https://amzn.to/3TKjeZH",
    description: "Melhor coisa que eu coloquei na cozinha!!!",
  }
]

export default function DevSoutinhoStore() {
  return (
    <div>
      Hi this is the entrypoint of the store!
      {products.map((product) => {
        return (
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <a href={product.link}>Link pra comprar!</a>
          </div>
        );
      })}
    </div>
  )
}
