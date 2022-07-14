import Image from "next/image";
import Link from "next/link";
import styles from '../styles/Footer.module.css';
const SFooter = () => {
  const footerItem: { href: string; content: string, imageSrc: string }[] = [
    { href: "https://github.com/maximilianou/", 
      content: "GitHub",
      imageSrc: "/github_logo.svg" 
    },
    {
      href: "https://profile.codersrank.io/user/maximilianou/",
      content: "CodersRank",
      imageSrc: "/codersrank_logo.svg" 
    },
    {
      href: "http://buymeacryptocoffee.xyz/simpledoers.eth",
      content: "Donate a Crypto coffee",
      imageSrc: "/eth_logo.svg" 
    },
    {
      href: "https://buymeacoffee.com/simpledoers/",
      content: "Donate a coffee",
      imageSrc: "/cup_of_coffee.svg" 
    },
    { href: "mailto:maximilianou@gmail.com", 
      content: "email",
      imageSrc: "/max_logo.svg" 
    },
  ];
  return (
    <footer className={styles.footerStyle}>
      <ul className={styles.ulStyle}>
        {footerItem.map((data, index ) => (
          <li key={index} className={`${styles.liStyle} `} >
            <Link href={data.href} target={"_blank"}>
              <a className={styles.buttonStyle}>
                { data.imageSrc && <Image width={40} height={30} src={data.imageSrc} alt={data.content} /> }
                { data.content }
              </a>
            </Link>            
          </li>
        ))}
      </ul>
    </footer>
  );
};
export default SFooter;

