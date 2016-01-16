let reverse = () => {
  return (text) => {
    return text.split("").reverse().join("");
  }
}

let boo = () => {
  return (text) => {
    return `boo ${text}`
  }
}

export { reverse,  boo };
