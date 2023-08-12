export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('in2Sql') // edit me!
    .addItem('Make SQL', 'openDialogMUI')
    .addItem('ClickHouse Tree', 'openAboutSidebar');

  menu.addToUi();
};

export const openDialogMUI = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-mui')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (MUI)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};
