export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border/50"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-4 px-4 py-10 md:h-20 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sonya Moorjani. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
