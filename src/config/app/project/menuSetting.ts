
export const DEFAULT_MENU_SETTING: MenuSetting = {
    showCollapsed: true,
    showMenu: true,
    collapsed: false,
    isRoutesMenu: false,
    menuIconMap: {
        'default': 'SmileOutlined',
        'dashboard': 'DashboardOutlined',
        'project': 'ProjectOutlined',
        'permission': 'KeyOutlined',
        '404': 'FileOutlined',
    },
    exposeMenuList: [
        '/dashboard',
        '/project',
        '/project/list',
        '/404'
    ]
}
