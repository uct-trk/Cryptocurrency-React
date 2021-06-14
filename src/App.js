import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Coin from './components/Coin'



function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(response => {setCoins(response.data)})
    .catch(error => console.error(error))
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter((coin) => 
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Kripto Para Ara</h1>
        <form>
          <input className="coin-input" onChange={handleSearch} type="text" placeholder="Ara" />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            marketcap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}/>
        )
      })}
    </div>
  );
}

export default App;
