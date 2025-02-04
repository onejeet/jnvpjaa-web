import React from 'react';

/* CONSTANTS */
import { EDITOR_ICONS } from '../../constants';

interface ToolIconProps {
  icon: string;
}

const ToolIcon: React.FC<ToolIconProps> = ({ icon }) => {
  const Icon = EDITOR_ICONS[icon || 'video'];

  return <Icon weight="bold" size={18} />;
};

export default React.memo(ToolIcon);
