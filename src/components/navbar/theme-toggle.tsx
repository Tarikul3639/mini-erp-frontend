import { useEffect, useState } from "react"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"))
    }, [])

    const toggleTheme = () => {
        const root = document.documentElement

        const dark = root.classList.contains("dark")

        if (dark) {
            root.classList.remove("dark")
            root.classList.add("light")
            localStorage.setItem("theme", "light")
            setIsDark(false)
        } else {
            root.classList.remove("light")
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setIsDark(true)
        }
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
    )
}
