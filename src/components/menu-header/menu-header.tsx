import React, { memo } from 'react'
import { Avatar, Card } from 'antd';
import "./menu-header-styles.css";
const { Meta } = Card;

const MenuHeader: React.FC = () => (
  <Card>
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Consultas"
      description="Web consulta de datos"
    />
  </Card>
);

export default memo(MenuHeader)
