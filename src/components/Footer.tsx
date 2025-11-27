import { FOOTER_CONTENT } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="mt-20 text-neutral-400 mx-6">
      <div className={`max-w-6xl mx-auto px-4 border-t ${theme === "dark"? "border-neutral-800":"border-neutral-400"}`}>
        <div className="flex flex-col justify-between md:flex-row gap-8 mt-20">
          {FOOTER_CONTENT.sections.map((section, index) => (
            <div key={index}>
              <h3
                className={`${
                  theme === "dark" ? "text-white " : "text-black"
                } font-medium text-sm sm:text-md mb-4`}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index} className={`${theme === "dark"? "text-neutral-500":"text-neutral-700"} text-sm sm:text-md`}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`my-12 border-t ${theme === "dark"? "border-neutral-800":"border-neutral-400"} pt-8 text-center text-sm text-neutral-600`}>
          <div className="flex flex-col justify-center md:flex-row md:justify-between gap-y-2">
            <div className="text-xs">
              <p>{FOOTER_CONTENT.platformsText}</p>
            </div>
            <div className="text-xs">
              <p>{FOOTER_CONTENT.copyrightText}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
