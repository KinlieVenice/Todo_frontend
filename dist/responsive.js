const toggleMenu = () => {
  const toggle_menu = document.querySelector("#toggle_menu");
  const sidePanel = document.querySelector("#sidePanel");
  const backdrop = document.querySelector(".backdrop");

  toggle_menu.classList.toggle("open");
  sidePanel.classList.toggle("open");
  backdrop.classList.toggle("open");

  // Toggle scroll-lock on <html>
  document.documentElement.classList.toggle("noscroll");
};
