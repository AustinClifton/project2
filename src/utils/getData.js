const banjoServer = 'https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';
const solaceServer = 'http://solace.ist.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';
const server = banjoServer;

const getData = async (endPoint) => {
  return (await fetch(`${server}${endPoint}/`)).json();
};

export default getData;