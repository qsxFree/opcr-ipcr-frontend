import React, { useContext } from "react";
import { Affix, Layout, Menu } from "antd";
import navigations from "../../../data/static/navigation";
import { useNavigate } from "react-router-dom";
import NavigatorContext from "../../../service/context/NavigatorContext";
import UserContext from "../../../service/context/UserContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const CustomSider = () => {
  let navigatorContext = useContext(NavigatorContext);
  let navigate = useNavigate();
  const user = React.useContext(UserContext);

  const [collapsed, setCollapsed] = React.useState(false);

  const _handleNavigation = (e) => {
    let menu = navigations.find((item) => {
      return item.uKey === e.key;
    });

    if (menu === undefined) {
      menu = navigations.filter((item) => item.basePath === null);
      console.log(menu);
      menu.forEach((item) => {
        item.sub.forEach((subItem) => {
          if (subItem.uKey === e.key) {
            navigate(subItem.basePath);
          }
        });
      });
    } else {
      navigate(menu.basePath);
    }
  };

  return (
    <Affix offsetTop={64}>
      <Layout.Sider
        collapsible
        theme="light"
        collapsedWidth={60}
        trigger={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[navigatorContext.selectedKey]}
          selectedKeys={[navigatorContext.selectedKey]}
          style={{ height: "90vh", borderRight: 0 }}
          onClick={_handleNavigation}
        >
          {navigations.map((navigation, index) => {
            if (navigation.basePath === null) {
              return navigation.role.includes(user.user._level.name) ? (
                <Menu.SubMenu
                  key={navigation.uKey}
                  title={navigation.name}
                  icon={navigation.icon}
                >
                  {navigation.sub.map((child, index) => {
                    return (
                      child.role.includes(user.user._level.name) && (
                        <Menu.Item key={child.uKey}>{child.name}</Menu.Item>
                      )
                    );
                  })}
                </Menu.SubMenu>
              ) : null;
            } else {
              return navigation.role.includes(user.user._level.name) ? (
                <Menu.Item key={navigation.uKey} icon={navigation.icon}>
                  {navigation.name}
                </Menu.Item>
              ) : null;
            }
          })}
        </Menu>
      </Layout.Sider>
    </Affix>
  );
};

export default CustomSider;
