import './App.css';

const iconPath = process.env.PUBLIC_URL + '/favicon.jpg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={iconPath} className="App-logo" alt="logo" />
        <p>
          По 100 грамм?
        </p>
        <a
          className="App-link"
          href="https://vk.com/return_418"
          target="_blank"
          rel="noopener noreferrer"
        >
          Писать сюда
        </a>
      </header>
    </div>
  );
}

export default App;
