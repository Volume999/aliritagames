import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from "@/components/navbar/Navbar"

vi.mock('next/navigation', () => ({
    usePathname: () => '/'
}))

vi.mock('next/link', () => ({
    default: ({ children, href }: { children: React.ReactNode, href: string }) => (
      <a href={href}>{children}</a>
    )
  }))

describe('Navbar', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders all navigation links', () => {
        render(<Navbar />)

        expect(screen.getByText("About")).toBeInTheDocument()
        expect(screen.getByText("Play Guess")).toBeInTheDocument()
        expect(screen.getByText("Sign up")).toBeInTheDocument()
        expect(screen.getByText("Log in")).toBeInTheDocument()
    })
})