import styles from '../styles/Menu.module.css'
const Menu = (  ) => {
  const menuItemData: { link:string , text:string }[] = [
    {
      link: `/`,
      text: `Home`,
    },
    {
      link: `https://simpledoers.eth.limo`,
      text: `Do eth`,
    },
    {
      link: `https://simpledoers.com`,
      text: `Do com`,
    },
    {
      link: `https://github.com/maximilianou`,
      text: `Github`,
    },
  ]
  return (
  <div className={styles.menuStyle} >
    { menuItemData && menuItemData.map( ({ link, text }, indx) => (
      <a key={indx}  href={link} className={styles.manuItemStyle} >{text}</a>
    ))}
  </div>
  )
};
export default Menu;