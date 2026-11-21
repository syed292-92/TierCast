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



  /*
    .map is a built in Javascript method that loops through every element in the array, runs a function on it, and returns a new array of the transformed results.

    TO DO:
      Make buttons for clearing the list, deleting a specific paragraph, and shuffling the pargraphs
  */
  return (
    <>
      <div className="main">
        <p>
          Hello
        </p>

        

        <button onClick={spawnP}>
          Click Me!
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