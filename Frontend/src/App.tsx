import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  Box,
  Check,
  Copy,
  Layers,
  Terminal,
} from 'lucide-react'
import { toast } from 'sonner'

import { ModeToggle } from '@/components/mode-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const stack = [
  { name: 'Vite', href: 'https://vite.dev' },
  { name: 'React', href: 'https://react.dev' },
  { name: 'Tailwind', href: 'https://tailwindcss.com' },
  { name: 'shadcn/ui', href: 'https://ui.shadcn.com' },
] as const

const starts = [
  {
    title: 'Local',
    hint: 'Hot reload on your machine',
    command: 'npm run dev',
  },
  {
    title: 'Docker',
    hint: 'Dev server in a container',
    command: 'docker compose up --build',
  },
  {
    title: 'Add UI',
    hint: 'Drop in another shadcn component',
    command: 'npx shadcn@latest add dialog',
  },
] as const

async function copyText(value: string) {
  await navigator.clipboard.writeText(value)
  toast.success('Copied to clipboard', { description: value })
}

function App() {
  const [name, setName] = useState('')

  function onPing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const label = name.trim() || 'starter'
    toast.success('Stack is wired up', {
      description: `${label} can start from src/App.tsx`,
    })
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,oklch(0.7_0.12_70_/_0.18),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.1_70_/_0.22),transparent_70%)]"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-3xl flex-col px-6 py-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Layers className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Starter</p>
              <p className="text-xs text-muted-foreground">Vite · React · shadcn</p>
            </div>
          </div>
          <ModeToggle />
        </header>

        <main className="flex flex-1 flex-col justify-center gap-10 py-16">
          <section className="space-y-5">
            <Badge variant="outline" className="gap-1.5 font-normal">
              <Box className="size-3" />
              Ready to clone
            </Badge>
            <div className="space-y-3">
              <h1 className="max-w-xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                A clean bench for the next frontend.
              </h1>
              <p className="max-w-lg text-muted-foreground text-pretty">
                Latest Vite, React, Tailwind, and shadcn/ui, plus a Dockerfile
                so you can spin this up locally or in a container and start
                shipping.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <Badge key={item.name} variant="secondary" asChild>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.name}
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Badge>
              ))}
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            {starts.map((item) => (
              <Card key={item.title} size="sm" className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.hint}</CardDescription>
                </CardHeader>
                <CardContent>
                  <button
                    type="button"
                    onClick={() => void copyText(item.command)}
                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/60 px-2.5 py-2 font-mono text-[11px] text-left transition-colors hover:bg-muted"
                  >
                    <span className="truncate">{item.command}</span>
                    <Copy className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </section>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="size-4" />
                Smoke test
              </CardTitle>
              <CardDescription>
                If this toast fires, React, shadcn, and the theme layer are all
                talking to each other.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={onPing}
                className="flex flex-col gap-3 sm:flex-row sm:items-end"
              >
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="project-name">Project name</Label>
                  <Input
                    id="project-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="atlas, ledger, kiln…"
                    autoComplete="off"
                  />
                </div>
                <Button type="submit">
                  <Check data-icon="inline-start" />
                  Ping the stack
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <Separator />

        <footer className="flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Replace this page and keep the stack.</p>
          <p className="font-mono">src/App.tsx</p>
        </footer>
      </div>
    </div>
  )
}

export default App
