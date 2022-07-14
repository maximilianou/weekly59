import styles from '../styles/MenuNav.module.css'
const MenuNav = (  ) => {
  const menuItemData: { link:string , text:string }[] = [
    {
      link: `#art01`,
      text: `1 article`,
    },
    {
      link: `#art02`,
      text: `2 article`,
    },
    {
      link: `#art03`,
      text: `3 article`,
    },
    {
      link: `#art04`,
      text: `4 article`,
    },
    {
      link: `#art05`,
      text: `5 article`,
    },
    {
      link: `#art06`,
      text: `6 article`,
    },
    {
      link: `#art07`,
      text: `7 article`,
    },
  ]
  return (
  <nav className={styles.menuNavStyle} >
    { menuItemData && menuItemData.map( ({ link, text }, indx) => (
      <a key={indx} href={link} className={styles.menuNavItemStyle} >{text}</a>
    ))}
  </nav>
  )
};
export default MenuNav;
