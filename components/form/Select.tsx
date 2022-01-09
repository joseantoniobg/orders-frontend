import styles from '../../styles/Select.module.scss';
import Select from 'react-select';

interface SelectProps {
  items: { value: number, label: string }[],
  label: string,
  name: string,
  setValue: any,
  selectedValue: number,
  leng?: string
}

const FormSelect = (props: SelectProps) => {
  const { label, items, name, setValue, selectedValue, leng } = props;

  const handleChange = (value) => {
    setValue(value);
  }

  return (
    <div style={{ width: leng ? leng : "100%" }}>
      <label htmlFor={name}>{label}</label>
      <Select options={items} onChange={handleChange} defaultValue={selectedValue ? items.find((i) => i.value === selectedValue) : null} />
    </div>
  )
}

export default FormSelect
