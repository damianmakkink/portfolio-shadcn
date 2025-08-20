import { Mail, MapPin, MessageCircle, Phone, Linkedin, Instagram } from "lucide-react";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  chatLabel?: string;
  chatDescription?: string;
  chatLink?: string;
}

const Contact7 = ({
  title = "Get in touch",
  description = "Connect for collaborations, questions, or opportunities.",
  emailLabel = "LinkedIn",
  emailDescription = "Reach out on LinkedIn.",
  email = "https://www.linkedin.com/in/sonyamoorjani/",
  officeLabel = "Email",
  officeDescription = "I'll respond as soon as I can.",
  officeAddress = "hello@example.com",
  phoneLabel = "Instagram",
  phoneDescription = "Follow and DM.",
  phone = "https://www.instagram.com/sonya.moorjani/",
  chatLabel = "Live Chat",
  chatDescription = "Get instant help from our support team.",
  chatLink = "Start Chat",
}: Contact7Props) => {
  return (
    <section className="bg-background py-32">
      <div className="container">
        <div className="mb-14">
          <h1 className="mb-3 mt-2 text-balance text-3xl font-semibold md:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full border border-white/15 bg-white/5">
              <Linkedin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
            <p className="text-muted-foreground mb-3">{emailDescription}</p>
            <a
              href={email}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full border border-white/15 bg-white/5">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{officeLabel}</p>
            <p className="text-muted-foreground mb-3">{officeDescription}</p>
            <a href={`mailto:${officeAddress}`} className="font-semibold hover:underline">
              {officeAddress}
            </a>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full border border-white/15 bg-white/5">
              <Instagram className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
            <p className="text-muted-foreground mb-3">{phoneDescription}</p>
            <a href={phone} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
              {phone}
            </a>
          </div>
          {/* Removed the 4th card to keep only 3 */}
        </div>
      </div>

    </section>
  );
};

export { Contact7 };
