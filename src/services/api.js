const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurruncy = async () => {
  const resquest = await fetch(ENDPOINT);
  const response = await resquest.json();
  return response;
};

export default fetchCurruncy;
