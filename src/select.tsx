
import { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'

export type SelectOption = {
    label: string
    value: string
}


type SingleSelectProps = {
    multiple?: false;
    value: SelectOption | undefined
    onChange: (value: SelectOption | undefined) => void

}

type MulitpleSelectProps = {
    multiple: true;
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void

}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MulitpleSelectProps)

export const Select = ({ multiple, options, value, onChange }: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isHighlithed, setHighlited] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined);
    }

    function selectOption(val: SelectOption) {
        if (multiple) {
            if (value.includes(val)) {
                onChange(value.filter(o => o !== val))
            } else {
                onChange([...value, val])
            }
        } else {
            if (val !== value) onChange(val)
        }
    }

    function isSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        setHighlited(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return
            switch (e.code) {
                case 'Enter':
                case 'Space':
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[isHighlithed])
                    break;
                case 'ArrowUp':
                case 'ArrowDown': {
                    if (!isOpen) {
                        setIsOpen(true)
                        break;
                    }
                    const newValue = isHighlithed + (e.code == 'ArrowDown' ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlited(newValue)
                    }
                    break;
                }
                case 'Escape':
                    setIsOpen(false)
                    break
            }


        }
        containerRef.current?.addEventListener('keydown', handler)
        return () => {
            containerRef.current?.removeEventListener('keydown', handler)
        }
    }, [isOpen, isHighlithed, options])

    

    return (
        
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}>
            <span className={styles.value}>{multiple ? value.map(v => (
                <button
                    className={styles['option-badge']}
                    onClick={(e) => {
                        e.stopPropagation()
                        selectOption(v)
                    }}
                    key={v.value}> {v.value} <span className={styles['remove-btn']}>&times;</span></button>
            )) : value?.value}</span>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    clearOptions()
                }}
                className={styles['clear-btn']}> &times;</button>
            <div className={styles.divider}> </div>
            <div className={styles.caret}> </div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {options.map((value, i) => {
                    return <li key={value.value}
                        onMouseEnter={() => setHighlited(i)}
                        onClick={
                            (e) => {
                                e.stopPropagation()
                                selectOption(value)
                                setIsOpen(false)
                            }
                        }
                        className={`${styles.option} 
                        ${isSelected(value) ? styles.selected : ''} 
                         ${isHighlithed === i ? styles.highlighted : ''}`}>
                        {value.label}
                    </li>

                })}

            </ul>


               
        </div>

        
    )
}