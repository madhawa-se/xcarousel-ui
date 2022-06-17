import logo from './logo.svg';
import './App.css';
import Carousel from './components/carousel/Carousel';

function App() {
  return (
    <div className="App">

      <div>
        <Carousel slides="3"
          infinite={false} />;
      </div>
    </div>
  );
}

export default App;
