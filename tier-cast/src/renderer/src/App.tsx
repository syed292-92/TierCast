import { useState } from 'react'
import Versions from './components/Versions'

function App(): React.JSX.Element {
  // Store an array of paragraphs in state
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  // A function that sends 'ping' via IPC (Inter-Process )
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  const spawnP = (): void => {
    // We create an entirely new array, since that lets React know to re-render the screen, this is because React checks memory addresses, not actual value.
    // We add a new paragraph and keep the previous ones as well 
    setParagraphs((prev) => [...prev, `Paragraph #${prev.length + 1}`]);
    ipcHandle();
  }

  const clearL = (): void => {
    setParagraphs([]);
  }
  
  const shuffleL = (): void => {
    if(paragraphs.length > 1){
      const n = paragraphs.length;
      const shuffled: string[] = new Array(n);
      const used = new Set<number>();

      for (let i = 0; i < n; i++) {
        let currIndex = Math.floor(Math.random() * n);

        // If taken, jump to the next index (wrapping around to 0 using modulus)
        while (used.has(currIndex)) {
          currIndex = (currIndex + 1) % n;
        }

        used.add(currIndex);
        shuffled[currIndex] = paragraphs[i];
      }
      setParagraphs(shuffled);
    }
  }

  
  /*
    .map is a built in Javascript method that loops through every element in the array, runs a function on it, and returns a new array of the transformed results.

    TO DO:
      Make buttons for deleting a specific paragraph, and shuffling the pargraphs
  */
  return (
    <>
      <div className="main">
        <p>
          Hello
        </p>

        <button onClick={clearL}>
          Clear List!
        </button>

        <button onClick={shuffleL}>
          Shuffle List!
        </button>

        <button onClick={spawnP}>
          Spawn Para
        </button>
        
        {
          paragraphs.map( 
            // Here we are creating a paragraph element, using the information text, and index to give them their key
            (text, index) => (
              // 
              <p key={index}>{text}</p>
            )
          )
        }
      </div>
    </>
  )
}


export default App