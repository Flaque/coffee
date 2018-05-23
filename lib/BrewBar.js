Array.prototype.pick = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const BrewBar = ({ progress, length = 5 }) => {
  if (progress >= 1.0) {
    return <p>{"done!"}</p>;
  }

  const dots = ".".repeat(Math.ceil(progress * length));

  if (!dots) {
    return <h1>Coffeegame</h1>;
  }

  return (
    <p>
      {["shh", "woosh", "VRRR", "CRACK", "fff", "zzz", "vrr", "hiss"].pick()}{" "}
      {dots}
    </p>
  );
};

export default BrewBar;
