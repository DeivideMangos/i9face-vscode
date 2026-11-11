const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Abrir menu" : "Fechar menu";
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    const label = menuToggle?.querySelector(".sr-only");
    if (label) label.textContent = "Abrir menu";
    navigation.classList.remove("is-open");
  });
});

const tabs = [...document.querySelectorAll("[data-catalog-tab]")];
const panels = [...document.querySelectorAll("[data-catalog-panel]")];

function activateTab(tab, moveFocus = false) {
  const selected = tab.dataset.catalogTab;
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.catalogPanel !== selected;
  });
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    activateTab(tabs[nextIndex], true);
  });
});

document.querySelectorAll("[data-open-catalog]").forEach((link) => {
  link.addEventListener("click", () => {
    const tab = tabs.find((item) => item.dataset.catalogTab === link.dataset.openCatalog);
    if (tab) activateTab(tab);
    const categoryName = link.dataset.openCategory;
    if (!categoryName) return;
    const panel = panels.find((item) => item.dataset.catalogPanel === link.dataset.openCatalog);
    const group = [...(panel?.querySelectorAll(".service-group") ?? [])].find(
      (item) => item.querySelector("summary")?.textContent.trim() === categoryName,
    );
    if (!group) return;
    group.open = true;
    window.setTimeout(() => group.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 680 && navigation?.classList.contains("is-open")) {
    navigation.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});
