export default function Demo({ msg }: { msg: string }) {
  return (
    <div>
      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      >
        Break the world
      </button>
      ;<div>{msg} 233</div>
      {/* <div className="element">hello world</div> */}
    </div>
  );
}
