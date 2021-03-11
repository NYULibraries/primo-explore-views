const appendStatusEmbed = () => {
  const script = document.createElement("script");
  script.src = "https://cdn.library.nyu.edu/statuspage-embed/index.min.js"; 
  document.body.append(script);
};

export default appendStatusEmbed;