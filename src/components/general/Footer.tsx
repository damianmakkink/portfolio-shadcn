export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center justify-between gap-4 px-4 py-10 md:h-20 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sonya Moorjani. All rights reserved.
        </p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <a className="hover:text-foreground" href="#">
            Instagram
          </a>
          <a className="hover:text-foreground" href="#">
            Vimeo
          </a>
          <a className="hover:text-foreground" href="#">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
