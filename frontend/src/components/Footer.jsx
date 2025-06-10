import { Github, Linkedin, ListCheck } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <div className="color-3 flex flex-col md:flex-row md:items-start justify-between p-12 min-h-[321px] bg-2 gap-4">
      <section className="flex flex-col justify-start p-0  md:w-1/2 ">
        <h3 className="mb-0 flex gap-2">
          <ListCheck size={38} style={{ color: "#ff0051" }} strokeWidth={3} />
          Task Management App
        </h3>

        <p>
          A simple yet powerful application to manage your tasks efficiently.
          Built with SpringBoot, SpringSecurity, Maven, MS Sql,Azure, Render,
          Nextjs, Tailwind, ShadCN.
        </p>
      </section>{" "}
      <hr className="boder border-active" />
      <section className="flex flex-col p-0 ">
        <h4>Quick Links</h4>
        <p>
          {" "}
          <Link href="/home">Home</Link>
        </p>

        <p>
          <Link href="/login">Login</Link>
        </p>
        <p>
          {" "}
          <Link href="/signup">Register</Link>
        </p>
      </section>
      <hr className="boder border-active" />
      <section className="p-0">
        <h4>Connect</h4>
        <div className="flex gap-2">
          {" "}
          <Link href="https://github.com/Skr0321">
            <Github />
          </Link>
          <Link href="https://www.linkedin.com/in/shekar-naik-b02aa7284/">
            <Linkedin />
          </Link>
        </div>
      </section>
      <hr className="boder border-active" />
      <section className="flex  flex-col items-center">
        <p>© 2025 Task Management App. All rights reserved.</p>
        <p>
          Created by F-{" "}
          <Link
            href={"https://github.com/Manish50518"}
            className="primary-text"
          >
            Manish{" "}
          </Link>
          & B-{" "}
          <Link href={"https://github.com/Skr0321"} className="primary-text">
            Shekar
          </Link>{" "}
        </p>
      </section>
    </div>
  );
}

export default Footer;
