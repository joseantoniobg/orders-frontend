import React from 'react';

import useDateForm from '../../hooks/useDateForm';
import styles from '../../styles/Date.module.scss';
import Input from './Input';

const DateField = () => {

  const date = useDateForm();
  const [showBox, setShowBox] = React.useState(false);
  const [margins, setMargins] = React.useState(['-350px', '0', '350px']);
  const [transition, setTransition] = React.useState({ transition: '0.4s' });

    function useOutsideAlerter(ref) {
      React.useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                  setShowBox(false);
              }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
  	}

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  const goToNextMonth = () => {
    setMargins(['-350px', '-350px', '0']);
    setTimeout(() => {
      setTransition({  transition: '0s' });
      date.goToNextMonth();
      setMargins(['-350px', '0', '350px']);
    }, 400);

    setTimeout(() => {
      setTransition({  transition: '0.4s' });
    }, 410);
  }

  const goToPreviousMonth = () => {
    setMargins(['0', '350px', '350px']);
    setTimeout(() => {
      setTransition({  transition: '0s' });
      date.goToPreviousMonth();
      setMargins(['-350px', '0', '350px']);
    }, 400);

    setTimeout(() => {
      setTransition({  transition: '0.4s' });
    }, 410);
  }

  return (
    <div ref={wrapperRef} className={styles.date}>
      <Input type="text" name="txtDate" label="Data:" value={date.value} onChange={date.onChange} error={null} onBlur={(e) => {}} />
      <button className={styles.showButton} onClick={() => setShowBox(!showBox)}>{showBox ? '⬆' : '⬇' }</button>
      <div className={`${styles.outbox} ${showBox ? '' : styles.hidden }`}>
        <button className={styles.monthBtn} onClick={goToPreviousMonth}>{'<'}</button>
         <div className={styles.canvas}>
            <div className={styles.mainContainer}>
          {date.dateProps.map((month, i) => <div key={i} style={{ left: margins[i], ...transition }} className={styles.container}>
            <p className={styles.month}>{`${month.month} ${date.currentYear !== month.year ? month.year : ''}`}</p>
            {month.weekDays.map((d, i) => <p className={styles.week} key={i}>{d}</p>)}
            {month.voidDays.map((_, i) => <div key={i}></div>)}
            {month.days.map(d => <button key={d} className={styles.day} value={d} onClick={() => date.setNewDate(d)}>{d}</button>)}
          </div>)}
        </div>
         </div>
        <button className={styles.monthBtn} onClick={goToNextMonth}>{'>'}</button>
      </div>
    </div>
  )
}

export default DateField
