export default function Card(props: { src: string }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.src} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <img src={props.src} className="card-img-top" alt="..." />
      </div>
    </div>
  );
}
