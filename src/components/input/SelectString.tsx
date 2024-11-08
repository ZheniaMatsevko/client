import { useEffect, useRef, useState } from "react"
import styles from "../../css/select.module.css"


type MultipleSelectProps = {
    multiple: true
    value: string[]
    onChange: (value: string[]) => void
    label: string
}

type SingleSelectProps = {
    multiple?: false
    value?: string
    onChange: (value: string | undefined) => void
    label: string
}

type SelectProps = {
    options: string[]
} & (SingleSelectProps | MultipleSelectProps)

export function SelectString({ multiple, value, onChange, options,  label }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: string) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
    }

    function isOptionSelected(option: string) {
        return multiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }

                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                }
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        containerRef.current?.addEventListener("keydown", handler)

        return () => {
            containerRef.current?.removeEventListener("keydown", handler)
        }
    }, [isOpen, highlightedIndex, options])

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}
            style={{
                backgroundColor: 'white', // Set background color to white
                color: 'black', // Set text color to black
            }}
        >
      <span className={styles.value}>
            {value && value.length > 0
                ? (multiple
                    ? value.map(v => (
                        <button
                            key={v}
                            onClick={e => {
                                e.stopPropagation()
                                selectOption(v)
                            }}
                            className={styles["option-badge"]}
                        >
                            {v}
                            <span className={styles["remove-btn"]}>&times;</span>
                        </button>
                    ))
                    : value)
                : label}
        </span>
            <button
                onClick={e => {
                    e.stopPropagation()
                    clearOptions()
                }}
                className={styles["clear-btn"]}
            >
                &times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}
                style={{
                    zIndex: 7878,
                    maxHeight: '200px',
                }}>
                {options.map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option}
                        className={`${styles.option} ${
                            isOptionSelected(option) ? styles.selected : ""
                        } ${index === highlightedIndex ? styles.highlighted : ""}`}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    )
}