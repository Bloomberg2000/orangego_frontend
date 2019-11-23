const {override, fixBabelImports, addLessLoader} = require('customize-cra');


module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#fac200',
            '@menu-background-color': '#fac200',
            '@link-color': '#fac200',
            '@menu-selected-color': '#474747',
            '@menu-dark-color': '@menu-selected-color',
            '@menu-dark-bg': '@menu-background-color',
            '@menu-dark-arrow-color': '@menu-selected-color',
            '@menu-dark-submenu-bg': '#D8D8D8',
            '@menu-dark-highlight-color': '@menu-selected-color',
            '@menu-dark-item-active-bg': '@menu-selected-color',
            '@menu-dark-selected-item-icon-color': '@menu-background-color',
            '@menu-dark-selected-item-text-color': '@menu-background-color',
            '@menu-dark-item-hover-bg': 'transparent',
            '@layout-sider-background': '@menu-background-color',
            '@layout-trigger-height': '48px',
            '@layout-trigger-background': '#fad500',
            '@layout-trigger-color': '@menu-selected-color',
        },
    }),
);
