import { useState } from "react"
import { Select, SelectOption } from "./select"


const options: SelectOption[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' }
]
function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])
  const [value1, setValue1] = useState<SelectOption[]>([options[0]])
  // console.log(option)

  return (
    <>
      <h1 style={{ color: 'red' }}> Multiple Select and Single Select from scratch</h1>
      <h2 style={{ color: 'orange' }}>Multiple Select</h2>
      <Select multiple options={options} value={value1} onChange={o => setValue1(o)}></Select>
      <br />
      <h2 style={{ color: 'orange' }}>Single Select</h2>
      <Select options={options} value={value} onChange={o => setValue(o)}></Select>
    </>
  )

}

export default App
