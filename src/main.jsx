import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {function Counter() {
      const [count, setCount] = useState(0);

      const handleClick = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
      };

      return <button onClick={handleClick}>Count: {count}</button>;
    }}
  </StrictMode>,
)
